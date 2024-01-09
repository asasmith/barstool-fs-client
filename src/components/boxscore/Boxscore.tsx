import { useLoaderData } from 'react-router-dom';

interface TeamInfo {
    abbreviation: string;
    first_name: string;
    last_name: string;
}

interface GameData {
    data: {
        league: string;
        away_team: TeamInfo;
        home_team: TeamInfo;
        away_period_scores: number[];
        home_period_scores: number[];
    };
}

export const Boxscore = function () {
    const { data } = useLoaderData() as GameData;

    function getFinalScore(teamScoreArray: number[]): number {
        const finalScore = teamScoreArray.reduce(function (
            acc: number,
            curr: number,
        ) {
            return acc + curr;
        });

        return finalScore;
    }

    const tableHead = data
        ? data.away_period_scores.map((_item, index: number) => {
              if (data.league === 'MLB') {
                  const inning = index + 1;
                  return <th className="w-14">{inning}</th>;
              }

              // handle ot periods
              if (data.away_period_scores.length > 4) {
                  if (index <= 3) {
                      return <th className="w-14">{index + 1}</th>;
                  } else {
                      return (
                          <th className="w-14">{`OT${
                              index - 3
                          }`}</th>
                      );
                  }
              } else {
                  return <th className="w-14">{index + 1}</th>;
              }
          })
        : [];

    return !data ? (
        <p>no data</p>
    ) : (
        <>
            <table className="table-auto border-white mb-6 w-3/4">
                <thead>
                    <tr>
                        <th className="w-14"></th>

                        {tableHead}

                        <th className="w-14">
                            {data.league === 'MLB' ? 'R' : 'T'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.away_team.abbreviation}</td>
                        {data.away_period_scores.map((score) => (
                            <td className="text-center">{score}</td>
                        ))}
                        <td className="text-center">
                            {getFinalScore(data.away_period_scores)}
                        </td>
                    </tr>

                    <tr>
                        <td>{data.home_team.abbreviation}</td>
                        {data.home_period_scores.map((score) => (
                            <td className="text-center">{score}</td>
                        ))}
                        <td className="text-center">
                            {getFinalScore(data.home_period_scores)}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-around w-full text-center">
                <div className="flex flex-col">
                    <p>{data.away_team.first_name}</p>
                    <p>{data.away_team.last_name}</p>
                </div>
                <div className="flex flex-col">
                    <p>{data.home_team.first_name}</p>
                    <p>{data.home_team.last_name}</p>
                </div>
            </div>
        </>
    );
};
