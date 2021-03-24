import React, { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import styled from "styled-components";
import ethereum from "../../assets/images/ethereum.webp";
import binance from "../../assets/images/binance.webp";

const ModalExample = (props: any) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <BoxModal>
      <Button className="custom-bg" color="danger" onClick={toggle}>
        <span className="icon-ethereum"></span>Ethereum
      </Button>

      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalBody>
          <BoxContent>
            <h2>Switch Network</h2>
            <BoxCrypto>
              <Item>
                <div>
                  <img src={ethereum} width={60} />
                  <span className="icon-circle"></span>
                </div>
                <div>Ethereum</div>
              </Item>

              <Item>
                <a target="_blank" href="http://exchange-v2.juiceswap.finance/">
                  <div>
                    <img src={binance} width={60} />
                  </div>
                  <div>Binance</div>
                </a>
              </Item>
            </BoxCrypto>
          </BoxContent>
        </ModalBody>
      </Modal>
    </BoxModal>
  );
};

const BoxModal = styled.div`
  .custom-bg {
    background: linear-gradient(90deg, rgb(15 236 229) 0%, rgb(9 143 221) 100%)
      rgb(222 206 232 / 87%);
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;
    font-weight: 500;

    &:focus {
      box-shadow: unset;
    }

    img {
      margin-right: 0;

      @media (min-width: 767px) {
        margin-right: 4px;
      }
    }

    @media (max-width: 767px) {
      font-size: 0;
    }
  }
`;

const BoxContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-ratius: 20px;
  padding: 15px;

  h2 {
    font-size: 24px;
    margin-bottom: 32px;
    color: #565a69;
  }
`;

const BoxCrypto = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    position: relative;
    color: #565a69;
  }
`;

export default ModalExample;
