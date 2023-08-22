import {
  Card,
  CardContent,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Startup } from "../../Types/Startup";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 20;

  const pageData = startups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleChangePage = (event: any, newPage: any) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await StartupHttpService.getStartups();

      setStartups(response);
    };

    // const fetchData = async () => {
    //   const response = await axios.get("/api/startups?all=true");
    //   const startup = response.data;

    //   setStartups(startup);
    // };

    fetchData();
  }, []);

  return (
    <Stack>
      <Pagination
        count={Math.ceil(startups.length / pageSize)}
        page={currentPage}
        onChange={handleChangePage}
      />
      {pageData.map((startup) => {
        return (
          <Card sx={{ mb: 2 }} key={startup.id}>
            <CardContent>
              <Typography>{startup.name}</Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Founded : {new Date(startup.dateFounded).getFullYear()} |{" "}
                {startup.employees} Employees | {startup.totalFunding} $ |{" "}
                {startup.currentInvestmentStage}
              </Typography>
              <Typography variant="body2">
                {startup.shortDescription}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}
