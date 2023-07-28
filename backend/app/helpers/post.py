from schemas.post import PostOut
from models.post import Post

def getData(post: Post) -> PostOut:
    post.post_team
    post.post_shift
    post.post_status
    
    post.app_count = len(post.post_apps)
    
    return post
