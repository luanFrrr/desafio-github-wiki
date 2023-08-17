import { useState } from "react";
import Input from "../components/Input";
import ItemRepo from "../components/ItemRepo";
import gitLogo from "../assets/github.png";
import { Container } from "./styles";
import Button from "../components/Button";
import { api } from "../services/api";

function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    if (currentRepo !== "") {
      await api
        .get(`repos/${currentRepo}`)
        .then((response) => {
          console.log(response);
          console.log(response.data.id);
          let data = response.data;
          if (data?.id) {
            const isExist = repos.find((repo) => repo.id === data.id);
            if (!isExist) {
              setRepos((prev) => [...prev, data]);
              setCurrentRepo("");
              return;
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            alert("Repositorio nao encontrado");
          }
        });
    } else alert("Especifique um repositorio");
  };

  const handleRemoveRepo = (id) => {
    setRepos((current) => current.filter((repo) => repo.id !== id));
  };

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="logo" />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => (
        <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo} />
      ))}
    </Container>
  );
}

export default App;
