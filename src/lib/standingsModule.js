import api from "./api";

export async function getTable(competitionId) {
  if (competitionId === 2001) {
    try {
      const request = await api.sendRequest(
        "get",
        `https://api.football-data.org/v2/competitions/${competitionId}/standings?standingType=TOTAL`
      );

      if (!request) {
        return null;
      }

      const data = await request.json();
      console.log("data-ucl", data);
      if (!data.standings) {
        throw new Error("[standingsModule.getTable] No Table Returned");
      }
      return null;
    } catch (error) {
      console.log("error", error);
    }
  }

  try {
    const request = await api.sendRequest(
      "get",
      `http://api.football-data.org/v2/competitions/${competitionId}/standings?standingType=TOTAL`
    );

    if (!request) {
      return null;
    }

    const data = await request.json();
    if (!data.standings[0].table) {
      throw new Error("[standingsModule.getTable] No Table Returned");
    }
    return data.standings[0].table;
  } catch (error) {
    console.log("error", error);
  }
}

export default {
  getTable
};
