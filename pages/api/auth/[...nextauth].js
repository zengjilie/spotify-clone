import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { refreshAccessToken } from "spotify-web-api-node/src/server-methods"
import LOGIN_URL, { spotifyApi } from "../../../lib/spotify"

async function refreshAccessToken(token){
    try{
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken)

        const {body: refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log('refreshtoken is', refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Data.now() + refreshedToken.expires_in * 1000, // = 1hr
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }

    }catch(err){
        console.log(err);
        return {
            ...token,
            err:'refreshAccessTokenError'
        }
    }
}

export default NextAuth({

    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRENT,
            authorization:LOGIN_URL
        }),
    ],

    secret:process.env.JWT_SECRET,

    pages:{
        signIn:'/login',
    } ,

    callbacks:{
        async jwt ({token,user,account}){
            if(user && account){
                console.log('token', token);
                console.log('account', account);
                return {
                    ...token,
                    accessToken:account.access_token,
                    refreshToken:account.refresh_token,
                    username:account.providerAccountId,
                    accessTokenExpires:account.expires_at * 100
                }
            }

            if(Date.now() < token.accessTokenExpires){
                return token;
            }

            return await refreshAccessToken(token);
        }

    }
}) 