import api from "./api";

export async function getSelectedTeams(competitionId) {
  try {
    const request = await api.sendRequest(
      "get",
      `https://api.football-data.org/v2/competitions/${competitionId}/teams`
    );

    if (!request) {
      return null;
    }

    const data = await request.json();
    if (!data.teams) {
      throw new Error("[competitionTeams.getSelectedTeams] No Table Returned");
    }
    return (data.teams);
  } catch (error) {
    console.log(error)
    throw new Error("Too many Api calls, only 10 calls per minute.")
  }
}

export default {
  getSelectedTeams
};
