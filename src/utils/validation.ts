export const idValidation = ($checkDuplicated: string) => {
  return {
    required: "아이디는 필수 입력 항목입니다.",
    maxLength: {
      value: 30,
      message: "아이디는 최대 30글자입니다.",
    },
    minLength: {
      value: 2,
      message: "아이디는 최소 2글자입니다.",
    },
    validate: {
      checkDuplicated: (value: any) =>
        $checkDuplicated === "Available!" || "아이디 중복 확인을 해주세요.",
    },
  };
};

export const nameValidation = () => {
  return {
    required: true,
    maxLength: 30,
    minLength: 2,
  };
};

export const emailValidation = () => {
  return {
    required: true,
    maxLength: {
      value: 30,
      message: "이메일은 최대 30글자까지 가능합니다.",
    },
    minLength: {
      value: 2,
      message: "이메일은 최소 2글자 이상이어야 합니다.",
    },
    pattern: {
      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      message: "유효하지 않은 형식입니다.",
    },
  };
};
