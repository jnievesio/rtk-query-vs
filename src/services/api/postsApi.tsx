import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signIn } from "../auth/providers/aws";

export const postsApi = createApi({
    //Dirección del reducer en el store de redux
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({
        //baseUrl: "http://localhost:3005",
        baseUrl: "/",
        //, prepareHeaders
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "/posts",
        }),
        loginUser: builder.mutation({
            async queryFn({ username, password, ...params }) {
                try {
                    const result = await signIn(username, password);
                    return { data: result };
                } catch (error) {
                    return { data: error };
                }
            },
            // configuration for an individual endpoint, overriding the api setting
           // keepUnusedDataFor: 5,
        }),
    }),
});

/*export const useGetPostState = postsApi.endpoints.loginUser.useQueryState;
export const useGetPostQuerySubscription =
postsApi.endpoints.loginUser.useQuerySubscription;*/

//genera hooks
export const { useGetPostsQuery, useLoginUserMutation } = postsApi;
