import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { InputTypes } from "../../model/enums/input-types";
import InputText from "../../components/InputText";
import SchemaUtils from "../../shared/util/schema-utils";
import {
  Container,
  FormContainer,
  Form,
  FullContainer,
  LogoContainer,
  LottieContainer,
  StyledLink,
  Subtitle,
} from "./styles";
import Lottie from "react-lottie";
import kakashi from "../../assets/lottie/kakashi.json";
import Logo from "../../assets/img/logo.svg";
import Button from "../../components/Button";

interface FormInput {
  username: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
}

const Register = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: kakashi,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const methods = useForm({
    resolver: yupResolver(SchemaUtils.register()),
    mode: "all",
  });

  const onSubmit = (data: FormInput) => {
    console.log(data);
  };

  const inputList = [
    {
      name: "username",
      placeholder: "Nome de Usuário",
      label: "Usuário*",
      type: InputTypes.USER,
    },
    {
      name: "email",
      placeholder: "exemplo@mail.com",
      label: "E-mail*",
      type: InputTypes.EMAIL,
    },
    {
      name: "emailConfirm",
      placeholder: "exemplo@mail.com",
      label: "Confirme o e-mail*",
      type: InputTypes.EMAIL,
    },
    {
      name: "password",
      placeholder: "Senha",
      label: "Senha*",
      type: InputTypes.PASSWORD,
    },
    {
      name: "passwordConfirm",
      placeholder: "Senha",
      label: "Confirme a senha*",
      type: InputTypes.PASSWORD,
    },
  ];

  return (
    <FullContainer>
      <LogoContainer>
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </LogoContainer>
      <Container>
        <FormContainer>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              {inputList.map((input, index) => (
                <InputText
                  key={`${input.name}-${index}`}
                  name={input.name}
                  placeholder={input.placeholder}
                  label={input.label}
                  type={input?.type ?? ""}
                  autofocus={index === 0}
                />
              ))}
              <Button text="Enviar" margin="8px 0" />
              <Subtitle>
                Já é cadastrado?
                <StyledLink to="/login">Acessar conta.</StyledLink>
              </Subtitle>
            </Form>
          </FormProvider>
        </FormContainer>
        <LottieContainer>
          <Lottie options={defaultOptions} />
        </LottieContainer>
      </Container>
    </FullContainer>
  );
};

export default Register;
