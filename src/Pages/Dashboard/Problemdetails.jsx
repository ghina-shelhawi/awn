import { Container } from "react-bootstrap";
import Map from "../../Components/Map";
import { useParams } from "react-router-dom";

export default function Problemdetalis() {
  const id = useParams();
  console.log(id);

  return (
    <div className="mt-4">
      <Container>
        <div className="row">
          <div className="col-lg-7"></div>
          <div className="col-lg-5">
            <Map coords={{ lat: 33.51, lng: 36.28 }} isReadOnly={true} />
          </div>
        </div>
      </Container>
    </div>
  );
}
