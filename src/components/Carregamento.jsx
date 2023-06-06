import Spinner from "react-bootstrap/Spinner";

export default function CarregamentoTela() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spinner variant="warning" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export function CarregamentoBotao({ variant }) {
  return (
    <>
      <Spinner size="sm" variant={variant} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
}
