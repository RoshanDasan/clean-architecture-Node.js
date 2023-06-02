import User from "../models/userModel";
import ObjectId from "mongoose";

export const userRepositoryMongoDB = () => {
    const addUser =async (user:{
        name:string;
        userName: string;
        email: string;
        number?: number;
        password?: string;
    }) => {
        
        const newUser = new User(user);
        
        return await newUser.save();
    };
    const getUserByEmail = async (email:string) => {
        const user: any = await User.findOne({email});
        return user
    };  
    const getUserByUserName = async (userName:string) => {
        
        const user: any = await User.findOne({userName})
        return user;
    };
    const getUserById = async (id:string) => {
        const user: any = await User.findOne({_id:id})
        return user;
    };
    const getFollowers = async (_id: string) => {
        const user: any = await User.findOne({ _id });
        const followers: any[] = await Promise.all(
          user.followers.map(async (follower: any) => {
            return await User.findOne({ _id: follower });
          })
        );
        return followers;
      };
      
     const getFollowings = async (_id: string) => {
        const user: any = await User.findOne({ _id });
        const followings: any[] = await Promise.all(
          user.following.map(async (following: any) => {
            return await User.findOne({ _id: following });
          })
        );
      
        return followings;
      };
      
    const findFriend = async (_id: string, friendId: any) => {
        const user: any = await User.findOne({_id})
       
        
        const isUserExist: any = await user.followers.find((user: any) => user === friendId)
        
        return isUserExist;
    }

    const unfollowFriend = async (_id: string, friendId: string) => {
        // remove friend from user follower list
         await User.findByIdAndUpdate({_id}, 
            {$pull:{followers: friendId}});
         await User.findByIdAndUpdate({_id: friendId},
            {$pull:{following: _id}})
        const friendDetails: any = await User.findOne({_id: friendId});

        return friendDetails
    }

    const followFriend = async (_id: string, friendId: string) => {
        // add friend to user follower list
         await User.findByIdAndUpdate({_id}, 
            {$push:{followers: friendId}});
         await User.findByIdAndUpdate({_id: friendId},
            {$push:{following: _id}})
        const friendDetails: any = await User.findOne({_id: friendId});

        return friendDetails
    }

    
    

    return {
        addUser,
        getUserByEmail,
        getUserByUserName,
        getUserById,
        getFollowers,
        getFollowings,
        findFriend,
        unfollowFriend,
        followFriend
    };
}

export type userRepositoryMongoDB = typeof userRepositoryMongoDB;