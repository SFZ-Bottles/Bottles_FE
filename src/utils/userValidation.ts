export interface UserValidation {
  name?: string | undefined;
  email?: string | undefined;
  id?: string | undefined;
  pw?: string | undefined;
  info?: string | undefined;
}

export default function userValidation({
  name,
  email,
  id,
  pw,
  info,
}: UserValidation) {
  const errors: UserValidation = {};
  nameValidation(name, errors);
  emailValidation(email, errors);
  idValidation(id, errors);
  pwValidation(pw, errors);
  infoValidation(info, errors);
  return errors;
}

const nameValidation = (name: string | undefined, errors: UserValidation) => {
  if (!name) {
    errors.name = "이름이 입력되지 않았습니다.";
  } else if (name.length > 30) {
    errors.name = "이름의 최대 길이는 30자입니다.";
  }
};

const emailValidation = (email: string | undefined, errors: UserValidation) => {
  if (!email) {
    errors.email = "이메일이 입력되지 않았습니다.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "입력된 이메일이 유효하지 않습니다.";
  }
};

const idValidation = (id: string | undefined, errors: UserValidation) => {
  if (!id) {
    errors.id = "아이디가 입력되지 않았습니다.";
  } else if (id.length > 30) {
    errors.id = "아이디의 길이는 최대 30자입니다.";
  }
};

const pwValidation = (pw: string | undefined, errors: UserValidation) => {
  if (!pw) {
    errors.pw = "비밀번호가 입력되지 않았습니다.";
  } else if (pw.length > 30 || pw.length < 8) {
    errors.pw = "비밀번호의 길이는 최소 8자리, 최대 30자리입니다.";
  }
};

const infoValidation = (info: string | undefined, errors: UserValidation) => {
  if (!info) {
    errors.info = "소개글을 입력해주세요.";
  } else if (info.length > 100) {
    errors.info = "100글자를 넘어서는 안됩니다.";
  }
};
