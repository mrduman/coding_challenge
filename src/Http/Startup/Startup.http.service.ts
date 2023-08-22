import axios from "axios";
import { Startup, StartupDTO } from "../../Types/Startup";
import StartupMapper from "./Startup.mapper";

export class StartupHttpService {
  public static async getStartups() {
    const response = await axios.get<StartupDTO[]>(`/api/startups?all=true`);

    console.log("hallo", response);

    const startup = response.data.map((data) => {
      return StartupMapper.map(data);
    });

    return startup;
  }
  public static async getStartupById(id: string | number): Promise<Startup> {
    const response = await axios.get<StartupDTO>(`/api/startups/${id}`);
    return StartupMapper.map(response.data);
  }
}
