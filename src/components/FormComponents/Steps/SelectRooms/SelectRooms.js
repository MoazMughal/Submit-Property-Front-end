import React, { useState } from "react";
import { useFormik } from "formik";
import classes from "./SelectRooms.module.css";
import Button from "@mui/material/Button";
import * as Yup from "yup";

export default function SelectRooms(props) {
  const roomOptions = [
    { key: "Studio", value: "Studio" },
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
  ];

  const [noOfRooms, setNoOfRooms] = useState(props.data.noOfRooms);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      noOfRooms: props.data.noOfRooms,
    },
    validationSchema: Yup.object({
      noOfRooms: Yup.string().matches(/.*\d/, "Should contain only digits"),
    }),
    onSubmit: (values) => {
      console.log("valuess", values.noOfRooms);
      console.log("state", noOfRooms);
      if (noOfRooms === "" && values.noOfRooms === "") {
        setError(true);
        return;
      }
      props.next({
        ...props.data,
        noOfRooms: values.noOfRooms === "" ? noOfRooms : values.noOfRooms,
      });
      setError(false);
    },
  });

  const handleSelectTypeOfApartment = (option) => {
    setError(false);
    setNoOfRooms(option);
    formik.values.noOfRooms = "";
  };

  // useEffect(() => )

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.selectRooms}>
        <div id="my-room-group" className={classes.roomTitle}>
          5. How many bedrooms does the property have ?
        </div>
        <div role="group" className={classes.roomOptionsGroup}>
          {roomOptions.map((roption) => {
            return (
              <div
                key={roption.key}
                className={
                  noOfRooms === roption.value
                    ? classes.selectedRoomOption
                    : classes.roomOption
                }
                onClick={() => {
                  handleSelectTypeOfApartment(roption.value);
                }}
              >
                <span>{roption.value}</span>
                {noOfRooms === roption.value && (
                  <span className={classes.selectedCheck}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-check-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
          <input
            id="noOfRooms"
            name="noOfRooms"
            type="text"
            placeholder="No Of Rooms, if more than three...."
            onChange={(e) => {
              formik.handleChange(e);
              setNoOfRooms("");
            }}
            value={formik.values.noOfRooms}
            className={classes.inputNoOfRooms}
            onBlur={formik.handleBlur}
          />
          {formik.touched.noOfRooms && formik.errors.noOfRooms ? (
            <p className={classes.error}>{formik.errors.noOfRooms}</p>
          ) : null}
        </div>
        {error && <p className={classes.error}>Please select no of bedrooms</p>}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            type="button"
            sx={{
              backgroundColor: "#0A2351",
              marginRight: "20px",
              textTransform: "capitalize",
              ":hover": { backgroundColor: "#5D76A9" },
            }}
            onClick={() => props.prev()}
          >
            Back
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#0A2351",
              textTransform: "capitalize",
              ":hover": { backgroundColor: "#5D76A9" },
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}
