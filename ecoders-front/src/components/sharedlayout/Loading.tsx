import styled from 'styled-components';

function Loading() {
  return (
    <LoadingStyle id="floatingCirclesG">
      <div className="f_circleG" id="frotateG_01"></div>
      <div className="f_circleG" id="frotateG_02"></div>
      <div className="f_circleG" id="frotateG_03"></div>
      <div className="f_circleG" id="frotateG_04"></div>
      <div className="f_circleG" id="frotateG_05"></div>
      <div className="f_circleG" id="frotateG_06"></div>
      <div className="f_circleG" id="frotateG_07"></div>
      <div className="f_circleG" id="frotateG_08"></div>
    </LoadingStyle>
  );
}

export default Loading;

const LoadingStyle = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  margin: auto;
  transform: scale(0.6);
  -o-transform: scale(0.6);
  -ms-transform: scale(0.6);
  -webkit-transform: scale(0.6);
  -moz-transform: scale(0.6);

  div.f_circleG {
    position: absolute;
    background-color: rgb(255, 255, 255);
    height: 13px;
    width: 13px;
    border-radius: 7px;
    -o-border-radius: 7px;
    -ms-border-radius: 7px;
    -webkit-border-radius: 7px;
    -moz-border-radius: 7px;
    animation-name: f_fadeG;
    -o-animation-name: f_fadeG;
    -ms-animation-name: f_fadeG;
    -webkit-animation-name: f_fadeG;
    -moz-animation-name: f_fadeG;
    animation-duration: 1.2s;
    -o-animation-duration: 1.2s;
    -ms-animation-duration: 1.2s;
    -webkit-animation-duration: 1.2s;
    -moz-animation-duration: 1.2s;
    animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-direction: normal;
    -o-animation-direction: normal;
    -ms-animation-direction: normal;
    -webkit-animation-direction: normal;
    -moz-animation-direction: normal;
  }

  div#frotateG_01 {
    left: 0;
    top: 29px;
    animation-delay: 0.45s;
    -o-animation-delay: 0.45s;
    -ms-animation-delay: 0.45s;
    -webkit-animation-delay: 0.45s;
    -moz-animation-delay: 0.45s;
  }
  div#frotateG_02 {
    left: 8px;
    top: 8px;
    animation-delay: 0.6s;
    -o-animation-delay: 0.6s;
    -ms-animation-delay: 0.6s;
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
  }
  div#frotateG_03 {
    left: 29px;
    top: 0;
    animation-delay: 0.75s;
    -o-animation-delay: 0.75s;
    -ms-animation-delay: 0.75s;
    -webkit-animation-delay: 0.75s;
    -moz-animation-delay: 0.75s;
  }
  div#frotateG_04 {
    right: 8px;
    top: 8px;
    animation-delay: 0.9s;
    -o-animation-delay: 0.9s;
    -ms-animation-delay: 0.9s;
    -webkit-animation-delay: 0.9s;
    -moz-animation-delay: 0.9s;
  }
  div#frotateG_05 {
    right: 0;
    top: 29px;
    animation-delay: 1.05s;
    -o-animation-delay: 1.05s;
    -ms-animation-delay: 1.05s;
    -webkit-animation-delay: 1.05s;
    -moz-animation-delay: 1.05s;
  }
  div#frotateG_06 {
    right: 8px;
    bottom: 8px;
    animation-delay: 1.2s;
    -o-animation-delay: 1.2s;
    -ms-animation-delay: 1.2s;
    -webkit-animation-delay: 1.2s;
    -moz-animation-delay: 1.2s;
  }

  div#frotateG_07 {
    left: 29px;
    bottom: 0;
    animation-delay: 1.35s;
    -o-animation-delay: 1.35s;
    -ms-animation-delay: 1.35s;
    -webkit-animation-delay: 1.35s;
    -moz-animation-delay: 1.35s;
  }
  div#frotateG_08 {
    left: 8px;
    bottom: 8px;
    animation-delay: 1.5s;
    -o-animation-delay: 1.5s;
    -ms-animation-delay: 1.5s;
    -webkit-animation-delay: 1.5s;
    -moz-animation-delay: 1.5s;
  }
  @keyframes f_fadeG {
    0% {
      background-color: rgb(0, 0, 0);
    }

    100% {
      background-color: rgb(255, 255, 255);
    }
  }

  @-o-keyframes f_fadeG {
    0% {
      background-color: rgb(0, 0, 0);
    }

    100% {
      background-color: rgb(255, 255, 255);
    }
  }

  @-ms-keyframes f_fadeG {
    0% {
      background-color: rgb(0, 0, 0);
    }

    100% {
      background-color: rgb(255, 255, 255);
    }
  }

  @-webkit-keyframes f_fadeG {
    0% {
      background-color: rgb(0, 0, 0);
    }

    100% {
      background-color: rgb(255, 255, 255);
    }
  }

  @-moz-keyframes f_fadeG {
    0% {
      background-color: rgb(0, 0, 0);
    }

    100% {
      background-color: rgb(255, 255, 255);
    }
  }
`;
