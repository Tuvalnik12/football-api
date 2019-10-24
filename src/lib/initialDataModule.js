import api from "./api";

export async function getCompetitions() {
  try {
    const request = await api.sendRequest(
      "get",
      "https://api.football-data.org/v2/competitions"
    );

    if (!request) {
      return null;
    }

    const data = await request.json();
    if (!data.competitions) {
      throw new Error(
        "[initialDataModule.getCompetitions] No competitions returned"
      );
    }
    return processCompetitions(data.competitions);
  } catch (error) {
    console.log(error)
    throw new Error("Too many Api calls, only 10 calls per minute.")
  }
}

function processCompetitions(competitions) {
  if (!competitions || !competitions.length || !Array.isArray(competitions)) {
    throw new Error(
      "[initialDataModule.processCompetitions] invalid param competitions"
    );
  }

  return competitions.filter(competition => {
    return (
      competition.plan === "TIER_ONE" &&
      competition.id !== 2018 &&
      competition.id !== 2000 &&
      competition.id !== 2013 &&
      competition.id !== 2016 &&
      competition.id !== 2015 &&
      competition.id !== 2003 &&
      competition.id !== 2017
    );
  });
}

export default {
  getCompetitions
};
