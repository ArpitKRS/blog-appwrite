import config from '../config/config'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client()
    account 

    // only change the constructor & under the hood functions if you want to use diff backend service like firebase
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    // Creating an account for the user
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //call amother function
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    // Checks currently logged in or not
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }
        return null
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
        }
    }
}

const authService = new AuthService()

export default authService