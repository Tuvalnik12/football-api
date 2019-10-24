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
      if (!data.standings) {
        throw new Error("[standingsModule.getTable] No Table Returned");
      }
      return data.standings;
    } catch (error) {
      console.log(error);
      throw new Error("Too many Api calls, only 10 calls per minute.");
    }
  }

  try {
    const request = await api.sendRequest(
      "get",
      `https://api.football-data.org/v2/competitions/${competitionId}/standings?standingType=TOTAL`
    );

    if (!request) {
      return null;
    }

    const data = await request.json();
    if (!data.standings[0].table) {
      throw new Error("[standingsModule.getTable] No Table Returned");
    }
    return Array(data.standings[0].table);
  } catch (error) {
    console.log(error);
    throw new Error("Too many Api calls, only 10 calls per minute.");
  }
}

export default {
  getTable
};
