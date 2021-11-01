export interface GridProps {

    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;

    //padding
    //all breakpoints
    p?: number;
    px?: number;
    py?: number;
    pt?: number;
    pr?: number;
    pb?: number;
    pl?: number;
    //specific breakpoint
    //extra small
    pXS?: number;
    pXSx?: number;
    pXSy?: number;
    pXSt?: number;
    pXSr?: number;
    pXSb?: number;
    pXSl?: number;
    //small
    pSM?: number;
    pSMx?: number;
    pSMy?: number;
    pSMt?: number;
    pSMr?: number;
    pSMb?: number;
    pSMl?: number;
    //medium
    pMD?: number;
    pMDx?: number;
    pMDy?: number;
    pMDt?: number;
    pMDr?: number;
    pMDb?: number;
    pMDl?: number;
    //large
    pLG?: number;
    pLGx?: number;
    pLGy?: number;
    pLGt?: number;
    pLGr?: number;
    pLGb?: number;
    pLGl?: number;

    //margin
    m?: number;
    mx?: number;
    my?: number;
    mt?: number;
    mr?: number;
    mb?: number;
    ml?: number;
    //specific breakpoint
    //extra small
    mXS?: number;
    mXSx?: number;
    mXSy?: number;
    mXSt?: number;
    mXSr?: number;
    mXSb?: number;
    mXSl?: number;
    //small
    mSM?: number;
    mSMx?: number;
    mSMy?: number;
    mSMt?: number;
    mSMr?: number;
    mSMb?: number;
    mSMl?: number;
    //medium
    mMD?: number;
    mMDx?: number;
    mMDy?: number;
    mMDt?: number;
    mMDr?: number;
    mMDb?: number;
    mMDl?: number;
    //large
    mLG?: number;
    mLGx?: number;
    mLGy?: number;
    mLGt?: number;
    mLGr?: number;
    mLGb?: number;
    mLGl?: number;



    //display
    d?: "flex" | "block" | "inline-block";
    dXS?: "flex" | "block" | "inline-block";
    dSM?: "flex" | "block" | "inline-block";
    dMD?: "flex" | "block" | "inline-block";
    dLG?: "flex" | "block" | "inline-block";

    //flex-direction (if d="flex")
    fd?: "row" | "column" | "row reverse" | "column reverse";
    fdXS?: "row" | "column" | "row reverse" | "column reverse";
    fdSM?: "row" | "column" | "row reverse" | "column reverse";
    fdMD?: "row" | "column" | "row reverse" | "column reverse";
    fdLG?: "row" | "column" | "row reverse" | "column reverse";

    //justify-content (if d="flex")
    jc?: "space-between" | "space-around" | "space-evenly" | "flex-start" | "flex-end" | "center";
    jcXS?: "space-between" | "space-around" | "space-evenly" | "flex-start" | "flex-end" | "center";
    jcSM?: "space-between" | "space-around" | "space-evenly" | "flex-start" | "flex-end" | "center";
    jcMD?: "space-between" | "space-around" | "space-evenly" | "flex-start" | "flex-end" | "center";
    jcLG?: "space-between" | "space-around" | "space-evenly" | "flex-start" | "flex-end" | "center";

    //align-items (if d="flex")
    ai?: "stretch" | "flex-start" | "flex-end" | "center";
    aiXS?: "stretch" | "flex-start" | "flex-end" | "center";
    aiSM?: "stretch" | "flex-start" | "flex-end" | "center";
    aiMD?: "stretch" | "flex-start" | "flex-end" | "center";
    aiLG?: "stretch" | "flex-start" | "flex-end" | "center";






}