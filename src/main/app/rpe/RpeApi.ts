import axios, { AxiosInstance, AxiosResponse } from "axios";
import config from "config";



/**
 * @RPE_API
 */
export class RpeApi {


    private static _BASEURL: string = config.get('services.RPE_TOKEN.url')

    private static rpeAdaptor = () : AxiosInstance=> {
        return axios.create({
            baseURL: RpeApi._BASEURL,

        })
    }


   /**
    * 
    * @returns 
    */     
    public static async getRpeToken() {
        try {
            let Response : AxiosResponse = await RpeApi.rpeAdaptor().post('/testing-support/lease', {
                "microservice": "prl_cos_api"
            });
            return {response: true, data: Response.data}
        } catch (error) {
            return {response: false, data: error}
        }
      
      }

}