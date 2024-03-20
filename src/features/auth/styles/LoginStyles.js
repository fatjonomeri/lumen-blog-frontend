import { Card, InputText, Button } from "@fattureincloud/fic-design-system";
import styled from "styled-components";

export const CardWrapper = styled(Card)`
  border-top: 8px solid rgb(13, 151, 213) !important;
  background-color: rgb(255, 255, 255) !important;
  width: 350px;
  padding: 32px 48px !important;
`;

export const FormTitle = styled.div`
  font-size: 20px;
  line-height: 30px;
  font-weight: 500;
  text-align: center;
  color: rgb(13, 151, 213);
`;

export const InputWrapper = styled(InputText)`
  align-items: flex-start;
  & > div {
    width: 95%;
    margin-bottom: 6px;
  }
`;

export const ButtonWrapper = styled(Button)`
  margin-top: 24px;
  width: 100% !important;
`;

export const FooterWrapper = styled(Card)`
  padding: 16px;
  margin-top: 24px;
  font-size: 14px;
  line-height: 20px;
`;
