import api from "./api";

export async function getSelectedTeams(competitionId) {
  try {
    const request = await api.sendRequest(
      "get",
      `http://api.football-data.org/v2/competitions/${competitionId}/teams`
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
    console.log("error", error);
  }
}

export default {
  getSelectedTeams
};
