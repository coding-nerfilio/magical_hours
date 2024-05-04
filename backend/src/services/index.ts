import AuthService from "@src/services/Auth";
import GameService from "@src/services/Game";
import RankingService from "@src/services/Ranking";
import SocialService from "@src/services/Social";

const Services = {
  Auth: AuthService,
  Game: GameService,
  Ranking: RankingService,
  Social: SocialService,
};

export default Services;
