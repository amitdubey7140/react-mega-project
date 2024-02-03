import { Storage, Client, Databases, ID, Query } from "appwrite"
import { conf } from "../conf/conf";


export class Service{
    client = new Client()
    databases;
    bucket;
    
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,image,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                image,
                status,
                userId
            })
        } catch (error) {
            console.log('Appwrite Serivce :: createPost :: ', error);
        }
    }
    async updatePost(slug,{title,content,image,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                image,
                status
            })
        } catch (error) {
            console.log('Appwrite Serivce :: updatePost :: ', error);
        }
    }
    async deletePost(slug,{title,content,image,status}){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
            return true
        } catch (error) {
            console.log('Appwrite Serivce :: deletePost :: ', error);
            return false
        }
    }

    async getPost(slug){
        try {
            return this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log('Appwrite Serivce :: deletePost :: ', error);
            return false
        }
    }

    async getAllPosts(queries =[Query.equal('status',true)]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries)
        } catch (error) {
            console.log('Appwrite Serivce :: getAllPosts :: ', error);
            return false
        }

    }

    // file upload services

    async uploadFile(file){
        try {
            this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log('Appwrite Serivce :: uploadFile :: ', error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            this.bucket.deleteFile(conf.appwriteBucketId,fileId)
        } catch (error) {
            console.log('Appwrite Serivce :: deleteFile :: ', error);
            return false
        }
    }

    getFile(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
    }
}

const service = new Service()

export default service