import api from "./api";

export async function getFixture(competitionId, fixture) {
  try {
    const request = await api.sendRequest(
      "get",
      `https://api.football-data.org/v2/competitions/${competitionId}/matches?matchday=${fixture}`
    );

    if (!request) {
      return null;
    }

    const data = await request.json();
    if (!data.matches) {
      throw new Error(
        "[competitionFixtureModule.getFixture] No Table Returned"
      );
    }
    return data.matches;
  } catch (error) {
    console.log(error)
    throw new Error("Too many Api calls, only 10 calls per minute.")
  }
}
export default {
  getFixture
};
