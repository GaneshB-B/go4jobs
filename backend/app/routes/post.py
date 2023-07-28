from routes import APIRouter, HTTPException, Optional, List, Session
from schemas.post import PostIn, PostOut
from models.post import Post as PostModel
from helpers.post import getData


route_name = "Posts"


router = APIRouter(
    prefix=f"/{route_name.lower()}",
    tags=[f"{route_name}"]
)


# Create A Post
@router.post("/", response_model=PostOut)
def create_post(post: PostIn):
    with Session() as db:
        try:
            db_post = PostModel(**post.dict())
            
            db.add(db_post)
            db.commit()
            db.refresh(db_post)
        
        except Exception as e:
            print(e)
            db.rollback()

            raise HTTPException(status_code=400, detail="Job Post Not Added")
        
        return getData(db_post)


# Read All Posts
@router.get("/", response_model=List[PostOut])
def read_posts(status: Optional[int] = None):
    with Session() as db:
        posts = db.query(PostModel)

        if status:
            posts = posts.filter(PostModel.status == status)
        
        posts = posts.order_by(PostModel.status, PostModel.id.desc()).all()

        if len(posts) == 0:
            raise HTTPException(status_code=404, detail="No Job Posts Found")
        
        for post in posts:
            post = getData(post)
        
        return posts


# Read A Post
@router.get("/{post_id}", response_model=PostOut)
def read_post(post_id: int):
    with Session() as db:
        post = db.get(PostModel, post_id)
        
        if post is None:
            raise HTTPException(status_code=404, detail="Job Post Not Found")

        return getData(post)


# Update A Post
@router.put("/{post_id}", response_model=PostOut)
def update_post(post_id: int, post: PostIn):
    with Session() as db:
        db_post = db.get(PostModel, post_id)

        if db_post is None:
            raise HTTPException(status_code=404, detail="Job Post Not Found")

        try:
            post_data = post.dict(exclude_unset=True)

            for key, value in post_data.items():
                setattr(db_post, key, value)
            
            db.add(db_post)
            db.commit()
            db.refresh(db_post)
        
        except Exception as e:
            print(e)
            db.rollback()

            raise HTTPException(status_code=400, detail="Job Post Not Updated")

        return getData(db_post)


# Delete A Post
@router.delete("/{post_id}")
def delete_post(post_id: int):
    with Session() as db:
        db_post = db.get(PostModel, post_id)

        if db_post is None:
            raise HTTPException(status_code=404, detail="Job Post Not Found")

        try:
            db_post.status = 4
            
            db.add(db_post)
            db.commit()
            db.refresh(db_post)
        
        except Exception as e:
            print(e)
            db.rollback()
            raise HTTPException(status_code=400, detail="Job Post Not Deleted")
        
        return getData(db_post)
