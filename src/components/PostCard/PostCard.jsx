import React from 'react'
import appwriteService from '../../appwrite/config'
import { Link } from 'react-router-dom'
function PostCard({$id,title,featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full rounded-xl'>
            <div className='w-full mb-4'>
                <img src={appwriteService.getFile(featuredImage)} alt="" />
            </div>
            <h2 className=''>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard