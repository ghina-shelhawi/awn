import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

import { Axios } from "../../Api/Axois";
import { byCraftmen, CraftsmanAvailabilities } from "../../Api/Api";

import { Days } from "../../Helpers/Days";

import AvailabilityModal from "../../Components/Dashboard/craftman/AvailabilityModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/AuthContext";

export default function WorkSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reload, setreload] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const { user } = useContext(AuthContext);
  console.log(user.craftManID);
  const craftmanID = user.craftManID;
  const fetchSchedule = async () => {
    try {
      const res = await Axios.get(
        `${CraftsmanAvailabilities}/${byCraftmen}/${craftmanID}`,
      );
      setSchedule(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [reload]);
  async function deleteday(id) {
    await Axios.delete(`${CraftsmanAvailabilities}/${id}`);
    setreload((prev) => prev + 1);
  }
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between my-4">
        <div className="d-flex align-items-center gap-2 ">
          <FontAwesomeIcon icon={faUserClock} size="xl" color="orange" />
          <div>
            <h2 className="fw-bold">جدول دوامي الرسمي</h2>
          </div>
        </div>
        <Button
          className="bg-secondary border-0"
          onClick={() => {
            setSelectedId(null);
            setShowModal(true);
          }}
        >
          + إضافة موعد
        </Button>
      </div>
      <div className="card shadow-sm border-0 p-3 rounded-3">
        <h5 className="fw-bold mb-3 text-primary ">اوقات دوامي:</h5>
        <Table hover border={2} striped responsive>
          <thead className="table-primary">
            <tr>
              <th>اليوم</th>
              <th>من</th>
              <th>إلى</th>
              <th>الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {schedule.length > 0 ? (
              schedule.map((item) => (
                <tr key={item.availabilityID}>
                  <td>{Days[item.dayOfWeek]}</td>
                  <td>{item.startTime}</td>
                  <td>{item.endTime}</td>

                  <td>
                    <div className="d-flex  gap-3">
                      <FontAwesomeIcon
                        size="lg"
                        icon={faPencil}
                        color="orange"
                        onClick={() => {
                          setSelectedId(item.availabilityID);
                          setShowModal(true);
                        }}
                      ></FontAwesomeIcon>

                      <FontAwesomeIcon
                        icon={faTrash}
                        size="lg"
                        className="text-danger"
                        onClick={() => {
                          deleteday(item.availabilityID);
                        }}
                      ></FontAwesomeIcon>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={5} className="fw-bold text-primary">
                  {" "}
                  لايوجد بيانات لعرضها
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <AvailabilityModal
          show={showModal}
          currentSchedule={schedule}
          availabilityId={selectedId}
          handleClose={() => setShowModal(false)}
          onSaveSuccess={() => {
            setShowModal(false);

            fetchSchedule();
          }}
          craftman={craftmanID}
        />
      </div>
    </Container>
  );
}
