import styled, { css } from "styled-components";
import { GridProps } from "./GridProps";

const getWidth = (span: number) => {

    if (!span) return;
    let width = span / 12 * 100;
    return `width: ${width}%`;

}

const displayAndSpacing = css<GridProps>`
        display: ${props => props.d ? props.d : "unset"};
        flex-direction: ${props => props.d && props.fd ? props.fd : "unset"};
        justify-content: ${props => props.d && props.jc ? props.jc : "unset"};
        align-items: ${props => props.d && props.ai ? props.ai : "unset"};

        width: 100%;

        border-top: ${props => !props.m && props.mt ? props.mt : 0}px solid transparent;
        border-right: ${props => !props.m && props.mr ? props.mr : 0}px solid transparent;
        border-bottom: ${props => !props.m && props.mb ? props.mb : 0}px solid transparent;
        border-left: ${props => !props.m && props.ml ? props.ml : 0}px solid transparent;

        padding-top: ${props => !props.p && props.pt ? props.pt : 0}px;
        padding-right: ${props => !props.p && props.pr ? props.pr : 0}px;
        padding-bottom: ${props => !props.p && props.pb ? props.pb : 0}px;
        padding-left: ${props => !props.p && props.pl ? props.pl : 0}px;

        border: ${props => props.m ? props.m : 0}px solid transparent;
        padding: ${props => props.p ? props.p : 0}px;

`

const displayAndSpacingSM = css<GridProps>`
        display: ${props => props.dSM ? props.dSM : "unset"};
        flex-direction: ${props => props.dSM && props.fdSM ? props.fdSM : "unset"};
        justify-content: ${props => props.dSM && props.jcSM ? props.jcSM : "unset"};
        align-items: ${props => props.dSM && props.aiSM ? props.aiSM : "unset"};

        border-top: ${props => !props.mSM && props.mSMt ? props.mSMt : 0}px solid transparent;
        border-right: ${props => !props.mSM && props.mSMr ? props.mSMr : 0}px solid transparent;
        border-bottom: ${props => !props.mSM && props.mSMb ? props.mSMb : 0}px solid transparent;
        border-left: ${props => !props.mSM && props.mSMl ? props.mSMl : 0}px solid transparent;

        padding-top: ${props => !props.pSM && props.pSMt ? props.pSMt : 0}px;
        padding-right: ${props => !props.pSM && props.pSMr ? props.pSMr : 0}px;
        padding-bottom: ${props => !props.pSM && props.pSMb ? props.pSMb : 0}px;
        padding-left: ${props => !props.pSM && props.pSMl ? props.pSMl : 0}px;


        border: ${props => props.mSM ? props.mSM : 0}px solid transparent;
        padding: ${props => props.pSM ? props.pSM : 0}px;

`

const displayAndSpacingMD = css<GridProps>`

        display: ${props => props.dMD ? props.dMD : "unset"};
        flex-direction: ${props => props.dMD && props.fdMD ? props.fdMD : "unset"};
        justify-content: ${props => props.dMD && props.jcMD ? props.jcMD : "unset"};
        align-items: ${props => props.dMD && props.aiMD ? props.aiMD : "unset"};

        border-top: ${props => !props.mMD && props.mMDt ? props.mMDt : 0}px solid transparent;
        border-right: ${props => !props.mMD && props.mMDr ? props.mMDr : 0}px solid transparent;
        border-bottom: ${props => !props.mMD && props.mMDb ? props.mMDb : 0}px solid transparent;
        border-left: ${props => !props.mMD && props.mMDl ? props.mMDl : 0}px solid transparent;

        padding-top: ${props => !props.pMD && props.pMDt ? props.pMDt : 0}px;
        padding-right: ${props => !props.pMD && props.pMDr ? props.pMDr : 0}px;
        padding-bottom: ${props => !props.pMD && props.pMDb ? props.pMDb : 0}px;
        padding-left: ${props => !props.pMD && props.pMDl ? props.pMDl : 0}px;


        border: ${props => props.mMD ? props.mMD : 0}px solid transparent;
        padding: ${props => props.pMD ? props.pMD : 0}px;

`

const displayAndSpacingLG = css<GridProps>`

        display: ${props => props.dLG ? props.dLG : "unset"};
        flex-direction: ${props => props.dLG && props.fdLG ? props.fdLG : "unset"};
        justify-content: ${props => props.dLG && props.jcLG ? props.jcLG : "unset"};
        align-items: ${props => props.dLG && props.aiLG ? props.aiLG : "unset"};

        border-top: ${props => !props.mLG && props.mLGt ? props.mLGt : 0}px solid transparent;
        border-right: ${props => !props.mLG && props.mLGr ? props.mLGr : 0}px solid transparent;
        border-bottom: ${props => !props.mLG && props.mLGb ? props.mLGb : 0}px solid transparent;
        border-left: ${props => !props.mLG && props.mLGl ? props.mLGl : 0}px solid transparent;

        padding-top: ${props => !props.pLG && props.pLGt ? props.pLGt : 0}px;
        padding-right: ${props => !props.pLG && props.pLGr ? props.pLGr : 0}px;
        padding-bottom: ${props => !props.pLG && props.pLGb ? props.pLGb : 0}px;
        padding-left: ${props => !props.pLG && props.pLGl ? props.pLGl : 0}px;


        border: ${props => props.mLG ? props.mLG : 0}px solid transparent;
        padding: ${props => props.pLG ? props.pLG : 0}px;


`


export const Row = styled.div<GridProps>`
    box-sizing: border-box;
    width: 100%;
    

    &::after{
        content: "";
        clear: both;
        display: table;
    }

        ${displayAndSpacing}

  


    @media only screen and (min-width:768px){

        ${displayAndSpacingSM}

       
    }

    @media only screen and (min-width:992px){

        ${displayAndSpacingMD}


    }

    @media only screen and (min-width:1200px){

        ${displayAndSpacingLG}

    }

`

export const Col = styled.div<GridProps>`
    float: left;
    box-sizing: border-box;

    ${({ xs }) => (xs ? getWidth(xs) : "width: 100%;")}

  
    ${displayAndSpacing}

 
    @media only screen and (min-width:768px){

        ${({ sm }) => sm && getWidth(sm)};

        ${displayAndSpacingSM}

    }

    @media only screen and (min-width:992px){

        ${({ md }) => md && getWidth(md)};

        ${displayAndSpacingMD}

  
    }

    @media only screen and (min-width:1200px){

        ${({ lg }) => lg && getWidth(lg)};

        ${displayAndSpacingLG}

 
    }

`