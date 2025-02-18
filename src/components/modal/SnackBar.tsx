import { useRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components'
import { blackCloseIcon, successIcon } from '../../assets'
import { Image } from '../common'
import { snackBar } from '../../interfaces/ModalTypes'
import SnackBarAtom from '../../recoil/SnackBarAtom'

const SnackBar = ({ type }: snackBar) => {
  const { t } = useTranslation()

  const [isSnackbar, setIsSnackBar] = useRecoilState(SnackBarAtom)

  if (isSnackbar.open) {
    setTimeout(() => {
      setIsSnackBar({ open: false })
    }, 1500)
  }

  const snackBarCloseBtnHandler = () => {
    setIsSnackBar({ open: false })
  }
  return (
    <main>
      {isSnackbar.open && (
        <SnackWrapDiv>
          {type === 'one' && <OneLineTextP>{t('이메일 인증이 되었습니다.')}</OneLineTextP>}
          {type === 'date' && (
            <div>
              <OneLineTextP>{t('날짜 형식을 확인해주세요.')}</OneLineTextP>
              <DateP>{t('yyyy. mm. dd.로 적어주세요.')}</DateP>
            </div>
          )}

          {type === 'incorrectYear' && (
            <div>
              <OneLineTextP>{t('날짜 형식을 확인해주세요.')}</OneLineTextP>
              <DateP>{t('2020 ~ 2023년까지 등록 가능합니다.')}</DateP>
            </div>
          )}

          {type === 'incorrectMonth' && (
            <div>
              <OneLineTextP>{t('날짜 형식을 확인해주세요.')}</OneLineTextP>
              <DateP>{t('입력 월의 형식이 맞지 않습니다.')}</DateP>
            </div>
          )}

          {type === 'incorrectDate' && (
            <div>
              <OneLineTextP>{'날짜 형식을 확인해주세요.'}</OneLineTextP>
              <DateP>{'입력 일의 형식이 맞지 않습니다.'}</DateP>
            </div>
          )}

          {type === 'logo' && (
            <LogoSnackBarDiv>
              <Image width={45} height={45} src={successIcon} />
              <OneLineTextP>{'성공적으로 삭제됐어요.'}</OneLineTextP>
            </LogoSnackBarDiv>
          )}
          <CloseBtn onClick={snackBarCloseBtnHandler} />
        </SnackWrapDiv>
      )}
    </main>
  )
}

export default SnackBar
// 키프레임 정의
const slideDown = keyframes`
  from {
    transform: translateY(-88px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-88px);
    opacity: 0;
  }
`
const SnackWrapDiv = styled.div`
  width: 450px;
  height: 120px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 88px;
  left: 0;
  right: 0;
  margin: auto;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.35);

  /* animation: ${slideDown} 0.5s ${slideUp} 0.5s ease-in-out; */
  animation: ${slideDown} 0.5s ${slideUp} 0.5s ease-out; /* slideDown 또는 slideUp 애니메이션 적용 */
`

const CloseBtn = styled.button`
  background-image: url(${blackCloseIcon});
  background-color: transparent;
  position: absolute;
  right: 22px;
  top: 18px;
  width: 21px;
  height: 21px;
`
const OneLineTextP = styled.p`
  color: ${({ theme }) => theme.color.black};
  text-align: center;
  font-size: 25px;
  font-weight: 800;
  line-height: 35px;
`
const DateP = styled.p`
  color: ${({ theme }) => theme.color.black};
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 35px;
`
const LogoSnackBarDiv = styled.div`
  gap: 15px;
`
