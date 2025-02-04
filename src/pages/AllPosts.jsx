import React, {useState, useEffect} from 'react'
import {Container, PostCard} from '../components/index.js'
import appwriteService from '../appwrite/conf.js'

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    // Change made for re-renders
    useEffect(() => {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
      })
    }, [posts, setPosts])
    
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='w-full py-8'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post={post}/>
                </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
