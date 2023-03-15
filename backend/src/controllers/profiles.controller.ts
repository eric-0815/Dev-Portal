import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { addOrCreateProfile, findProfile, findProfiles, removeEducation, removeExperience, removeProfile, updateEducation, updateExperience } from "../services/profiles.service";
import { createErrorMsg } from "../utils/error";

export const getProfiles = async (req: Request, res: Response) => {
    try {
        // const userId = req.body.user.id
        const result = await findProfiles()
        return res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        // const userId = req.body.user.id
        const result = await findProfile(req.params.userId)
        if (result?.errors) return res.status(StatusCodes.BAD_REQUEST).send(result)
        return res.status(StatusCodes.OK).send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
    }
}

export const postProfile = async (req: Request, res: Response) => {
    try {
        const { body } = req
        console.log(`postProfile body: ${JSON.stringify(body)}`)
        const result = await addOrCreateProfile(body)
        if (result?.errors) return res.status(StatusCodes.BAD_REQUEST).send(result)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
    }
}

export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        const result = await removeProfile(userId)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
    }
}

export const putExperience = async (req: Request, res: Response) => {
    try {
        const result = await updateExperience(req.body)
        if (result?.errors) return res.status(StatusCodes.BAD_REQUEST).send(result)
        res.status(StatusCodes.OK).send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
    }
}

export const deleteExperience = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        const { expId } = req.params
        const result = await removeExperience(userId, expId)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
    }
}

export const putEducation = async (req: Request, res: Response) => {
    try {
        const result = await updateEducation(req.body)
        if (result?.errors) return res.status(StatusCodes.BAD_REQUEST).send(result)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
    }
}

export const deleteEducation = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        const { eduId } = req.params
        const result = await removeEducation(userId, eduId)
        res.send(result)
    } catch (err: any) {
        console.error(err.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
    }
}

// export const getGithub = async (req: Request, res: Response) => {
//     try {
//         const { userName } = req.params
//         // const result = await getGitHubResponse(userName)
//         // res.send(result)
//         const options = {
//             uri: `https://api.github.com/users/${userName
//                 }/repos?per_page=1&sort=created:asc&client_id=${config.get(
//                     "githubClientId"
//                 )}&client_secret=${config.get("githubSecret")}`,
//             method: "GET",
//             headers: { "user-agent": "node.js" },
//         };

//         request(options, (error: any, response: GithubResponse, body: string) => {
//             if (error) console.error(error);
//             if (response.statusCode !== 200) {
//                 return ({ msg: "No GitHub profile found" });
//             }
//             console.log(JSON.parse(body))
//             return res.send(JSON.parse(body))
//         });
//     } catch (err: any) {
//         console.error(err.message)
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(createErrorMsg("Server Error"))
//     }
// }
