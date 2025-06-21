import React, { useState } from "react";
import styled from "styled-components";
import panel9 from "../../../../application/Assets/img/banner2des.png";
import { Hooks_Dashboard } from "../../../../application/Hooks/Hooks_Dashboard";
const Templates_Dashboard = styled.div`
  .content {
    overflow: hidden;
    width: 100%;
    background: url("${panel9}");
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    .content__main {
      height: 100vh;
      width: 100%;
      display: flex;
    }
  }
`;

export default Templates_Dashboard;

