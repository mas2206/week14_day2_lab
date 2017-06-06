import React from "react";
import FilmDetail from "../components/FilmDetail.jsx";
import FilmSelector from "../components/FilmSelector.jsx";

class FilmContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      films: [],
      selectedFilm: null
    };
    this.setSelectedFilm = this.setSelectedFilm.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Morgan Freeman's Films</h1>
        <FilmSelector films = {this.state.films} onSelectFilm = {this.setSelectedFilm} />
        <FilmDetail film = {this.state.selectedFilm} />
      </div>
    );
  }

  componentDidMount() {
    const url = "http://netflixroulette.net/api/api.php?actor=Morgan%20Freeman";
    const request = new XMLHttpRequest();
    request.open("GET", url);

    request.addEventListener("load", () => {
      if (request.status !== 200) return;

      const jsonString = request.responseText;
      const data = JSON.parse(jsonString);
      this.setState({films: data, selectedFilm: data[0]});
    });
    request.send();
  }

  setSelectedFilm(film) {
    this.setState({selectedFilm: film});
  }

}

export default FilmContainer;