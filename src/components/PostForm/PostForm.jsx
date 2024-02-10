import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Input, Select, RTE } from "../index";

function PostForm({ post }) {
  const { register, control, setValue, watch, handleSubmit, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post?.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
      }
      const dbPost = await appwriteService.createPost(post.$id, {
        ...data,
        userId: userData.$id,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTrasnform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-Z\d\s]/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTrasnform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [slugTrasnform, watch, setValue]);
  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="flex ">
        <div className="w-2/3">
          <Input
            type="text"
            label="Title"
            placholder="Title"
            className=""
            {...register("title", {
              required: true,
            })}
          />

          <Input
            label="Slug"
            placholder="Slug"
            className=""
            type="text"
            {...register("slug", {
              required: true,
            })}
            onInput={(e) => {
              setValue(
                "slug",
                slugTrasnform(e.currentTarget.value, { shouldValidate: true })
              );
            }}
          />
          <RTE
            control={control}
            label={"Content"}
            name="content"
            defultvalue={setValue("content", getValues("content"))}
          />
        </div>
        <div className="w-1/3">
          <Input
            label="Featured Image"
            type="file"
            className=""
            accept="image/png, image/jpg,image/jpeg, image/gif"
            {...register("image", {
              required: !post,
            })}
          />

          {post && (
            <img
              src={appwriteService.getFile(post.featuredImage)}
              alt={post.title}
              className=""
            />
          )}
          <Select
            label='Status'
            options={['active','inactive']}
            className=''
            {...register('status',{
                required:true
            })}
          />

          <Button type="submit">
            {
            post?'Update' :'Submit'
          } 
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
