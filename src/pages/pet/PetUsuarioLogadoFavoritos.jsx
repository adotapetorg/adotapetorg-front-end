import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { CarregamentoListaPet } from "../../components/Carregamento";
import TituloPagina from "../../components/TituloPagina";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";

export default function PetUsuarioLogadoFavoritos() {
  const { token } = useContext(AuthContext);
  const { setarMensagem } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listaPets, setListaPets] = useState([]);

  useEffect(() => {
    listarPetsUsuarioLogadoFavoritos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarPetsUsuarioLogadoFavoritos() {
    setIsLoading(true);
    Api.post("pets/favoritos/user", null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        setListaPets(data.data);
      })
      .catch(({ response }) => {
        setListaPets(null);
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading ? (
        <CarregamentoListaPet />
      ) : (
        <>
          <TituloPagina titulo="Meus Pets Favoritos" />

          <Row xs={2} md={3} className="g-4">
            {listaPets == null ? (
              <div>Nenhum pet favoritado</div>
            ) : (
              <>
                {listaPets.map((pet) => (
                  <Col key={pet.id}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={process.env.REACT_APP_API_URL + pet.imagem}
                        alt={`foto pet ${pet.nome}`}
                      />
                      <Card.Body>
                        <Card.Title>{pet.nome}</Card.Title>
                        <Card.Text>{pet.raca}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <NavLinkToTop to={`/informacoes/pet/${pet.id}`}>
                          Informações
                        </NavLinkToTop>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </>
            )}
          </Row>
        </>
      )}
    </>
  );
}
