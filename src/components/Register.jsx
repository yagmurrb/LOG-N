import axios from "axios";
import { useEffect, useState } from "react";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";
const initialForm = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
};

export const errorMessages = {
  ad: "En az 3 karakter giriniz",
  soyad: "En az 3 karakter giriniz",
  email: "Geçerli bir eposta adresi giriniz",
  password:
    "Şifre en az 8 karakter giriniz, büyük harf, küçük harf, sembol ve karakter içermelidir.",
};
function Register() {
  const [formData, setFormData] = useState(initialForm);
  const [id, setId] = useState("");
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
  });
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  useEffect(() => {
    if (
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 3 &&
      validateEmail(formData.email) &&
      regex.test(formData.password)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name == "ad" || name == "soyad") {
      if (value.trim().length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name == "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name == "password") {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        setId(res.data.id);
        setFormData(initialForm);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <>
      <Card>
        <img src="https://workintech.com.tr/assets/logo-light-c0bded94.svg" />
        <CardHeader>
          Kayıt olmak için aşağıdaki bilgileri doldurunuz.
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="ad">İsim</Label>
              <Input
                id="ad"
                name="ad"
                placeholder="Adınızı giriniz"
                type="text"
                onChange={handleChange}
                invalid={errors.ad}
                data-cy="ad-input"
              />
              {errors.ad && (
                <FormFeedback data-cy="errMsgAd">
                  {errorMessages.ad}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="soyad">Soyisim</Label>
              <Input
                id="soyad"
                name="soyad"
                placeholder="Soyisminizi giriniz"
                type="text"
                onChange={handleChange}
                value={formData.soyad}
                invalid={errors.soyad}
                data-cy="soyad-input"
              />
              {errors.soyad && (
                <FormFeedback data-cy="errMsgSoyad">
                  {errorMessages.soyad}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Emailinizi giriniz"
                type="email"
                onChange={handleChange}
                value={formData.email}
                invalid={errors.email}
                data-cy="email-input"
              />
              {errors.email && (
                <FormFeedback data-cy="errMsgEmail">
                  {errorMessages.email}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                placeholder="Şifrenizi giriniz"
                type="password"
                onChange={handleChange}
                value={formData.password}
                invalid={errors.password}
                data-cy="password-input"
              />
              {errors.password && (
                <FormFeedback data-cy="errMsgPassword">
                  {errorMessages.password}
                </FormFeedback>
              )}
            </FormGroup>
            <Button disabled={!isValid} data-cy="submit-btn">
              Kayıt Ol
            </Button>
          </Form>
        </CardBody>
        {id && <CardFooter data-cy="id-value">ID: {id}</CardFooter>}
      </Card>
    </>
  );
}

export default Register;