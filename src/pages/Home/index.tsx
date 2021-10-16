import { useState, useEffect } from "react";
import Header from "../../components/Header";
import bannerImg from "../../assets/img/banner.png";
import EpisodeCard from "../../components/EpisodeCard";
import Pagination from "../../components/Pagination";
import AnimeCard from "../../components/AnimeCard";
import Carousel from "../../components/Carousel";
import rimuruImg from "../../assets/img/avatar-matheus.png";
import umaruImg from "../../assets/img/avatar-laiane.png";
import milimImg from "../../assets/img/avatar-emanuela.png";
import bokutoImg from "../../assets/img/avatar-thor.png";
import sailorImg from "../../assets/img/avatar-thaina.png";
import BackTop from "../../components/BackTop";
import { Episode } from "../../model/episode";
import { Anime } from "../../model/anime";
import { daisukiApi } from "../../services/api";
import {
  Banner,
  Text,
  Image,
  Main,
  Section,
  Title,
  ReleasesList,
  Footer,
  Developers,
  FooterImg,
} from "./styles";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [popularAnimes, setPopularAnimes] = useState<Anime[]>([]);
  const [latestAnimes, setLatestAnimes] = useState<Anime[]>([]);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    daisukiApi.get("/episodes")
    daisukiApi
      .get("/animes/most-popular")
      .then((res) => setPopularAnimes(res.data))
      .catch((err) => console.log(err));
    daisukiApi
      .get("/animes/latest")
      .then((res) => setLatestAnimes(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <Banner>
        <Text>
          <p>
            Assista <span>animes online</span> com qualidade
          </p>
        </Text>
        <Image>
          <img src={bannerImg} alt="Personagem Shuna" />
        </Image>
      </Banner>
      <Main>
        <Section>
          <Title>Lançamentos</Title>
          <ReleasesList>
            {episodes.map((episode, index) => (
              <li key={index}>
                <EpisodeCard episode={episode} />
              </li>
            ))}
          </ReleasesList>
          <Pagination
            current={currentPage}
            pageSize={12}
            total={108}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>Animes mais populares</Title>
          <Carousel>
            {popularAnimes.map((anime, index) => (
              <AnimeCard key={index} anime={anime} rank={index + 1} />
            ))}
          </Carousel>
        </Section>
        <Section>
          <Title>Últimos animes adicionados</Title>
          <Carousel>
            {latestAnimes.map((anime, index) => (
              <AnimeCard key={index} anime={anime} />
            ))}
          </Carousel>
        </Section>
      </Main>
      <Footer>
        <div>
          <p>
            Projeto realizado com fins didáticos. Os vídeos são somente prévias
            dos episódios.
            <br /> Todos os direitos de personagens e obras pertecem aos
            respectivos proprietários.
          </p>
          <Developers>
            <p>Aplicação desenvolvida por:</p>
            <div>
              <a
                href="https://github.com/matheuspaivah2"
                target="_blank"
                rel="noreferrer"
                title="Matheus Paiva"
              >
                <img src={rimuruImg} alt="Rimuru" />
              </a>
              <a
                href="https://github.com/laianesuzart"
                target="_blank"
                rel="noreferrer"
                title="Laiane Suzart"
              >
                <img src={umaruImg} alt="Umaru" />
              </a>
              <a
                href="https://github.com/emanuelakenzie"
                target="_blank"
                rel="noreferrer"
                title="Emanuela Quizini"
              >
                <img src={milimImg} alt="Milim" />
              </a>
              <a
                href="https://github.com/PauloThor"
                target="_blank"
                rel="noreferrer"
                title="Paulo Thor"
              >
                <img src={bokutoImg} alt="Bokuto" />
              </a>
              <a
                href="https://github.com/thainaferreira"
                target="_blank"
                rel="noreferrer"
                title="Thainá Ferreira"
              >
                <img src={sailorImg} alt="Sailor Moon" />
              </a>
            </div>
            <p>NekoNekoMi - 2021</p>
          </Developers>
          <FooterImg />
        </div>
      </Footer>
      <BackTop />
    </>
  );
};

export default Home;
