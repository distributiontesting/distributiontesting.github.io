function QueryC(inp_1, inp_2, inp_3)  
{

// Tick Box setup

// Closeness Button
TBox_1IsTv = inp_1[0]
TBox_1IsInfty = inp_1[1]
TBox_1IsZero = inp_1[2]

// Farness Button
TBox_2IsTv = inp_2[0]
TBox_2IsInfty = inp_2[1]
TBox_2IsZero = inp_2[2]

// Upper / Lower Bound Button
TBox_3IsLB = inp_3[0]
TBox_3IsUB = inp_3[1]


if (TBox_3IsUB)
{
    if (TBox_1IsZero && TBox_2IsTv)
    {
        // Non-Tolerant vs Total Variation Distance
        SAMPSAMP = 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)';
        complComment["SAMPSAMP"] = "Follows from Theorem 1 of [" + batu2013testing + "].";
        DUALSAMP = 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)';
        complComment["DUALSAMP"] = "Follows from above";
        PAIRSAMP = 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)';
        complComment["PAIRSAMP"] = "Follows from above";;
        SUBSAMP = 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)';
        complComment["SUBSAMP"] = "Follows from above";;
        CONDSAMP = 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)';
        complComment["CONDSAMP"] = "Follows from above";;
        FULLSAMP = 'O\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)';
        complComment["FULLSAMP"] = "Follows from [" + valiant2017automatic + "]";

        DUALDUAL = 'O\\left(\\frac{1}{\\varepsilon}\\right)';
        complComment['DUALDUAL'] = "Follows from [" + canonne2014testing + "]";
        PAIRDUAL = 'O\\left(\\frac{\\log{N}}{\\varepsilon^2} + \\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)';
        complComment["PAIRDUAL"] = "Follows from [" + potescalable + "]";
        SUBDUAL = 'O\\left(\\frac{dN}{\\varepsilon^{2}}\\right)';
        complComment["SUBDUAL"] = "Follows from ["+ adar2024improved +"]";
        CONDDUAL = 'O\\left(\\frac{\\log{N}}{\\varepsilon^2} + \\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)';
        complComment["CONDDUAL"] = "Follows from PAIRCOND vs DUAL";
        FULLDUAL = 'O\\left(\\frac{1}{\\varepsilon}\\right)';
        complComment["FULLDUAL"] = "Follows from DUAL vs DUAL";

        PAIRPAIR = 'O\\left(\\frac{\\log^6{N}}{\\varepsilon^{21}}\\right)';
        complComment["PAIRPAIR"] = "Follows from [" + canonne2015testing + "]";
        SUBPAIR = '';
        complComment["SUBPAIR"] = " ";
        CONDPAIR = 'O\\left(\\frac{\\log^6{N}}{\\varepsilon^{21}}\\right)';
        complComment["CONDPAIR"] = "Follows from PAIRCOND vs PAIRCOND";
        FULLPAIR = 'O\\left(\\frac{\\sqrt{\\log{N}}}{\\varepsilon^2}\\right)';
        complComment["FULLPAIR"] = "Follows from [" + nar2020cond + "]";

        SUBSUB = 'O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)';
        complComment["SUBSUB"] = "Follows from [" + kumar2023tolerant + "]";
        CONDSUB = 'O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)';
        complComment["CONDSUB"] = "Follows from up"
        FULLSUB = 'O\\left(\\frac{dN}{\\varepsilon^{2}}\\right)';
        complComment["FULLSUB"] = "Follows from ["+ adar2024improved +"]";

        CONDCOND = 'O\\left(\\frac{\\log{\\log{N}}}{\\varepsilon^5}\\right)';
        complComment["CONDCOND"] = "Follows from [" + falahatgar2015faster + "]";
        FULLCOND = 'O\\left(\\frac{1}{\\varepsilon^2}\\right)';
        complComment["FULLCOND"] = "Follows from [" + falahatgar2015faster + "]";
        return;

    }

    if (TBox_1IsInfty && TBox_2IsTv)
    {
        //TODO: Add the correct complexity

    }


    if (TBox_1IsTv && TBox_2IsTv)
    {
        // Tolerant Total Variation Distance vs Total Variation Distance
        SAMPSAMP = '';
        complComment["SAMPSAMP"] = "";
        DUALSAMP = '';
        complComment["DUALSAMP"] = "";
        PAIRSAMP = '';
        complComment["PAIRSAMP"] = "";;
        SUBSAMP = '';
        complComment["SUBSAMP"] = "";;
        CONDSAMP = '';
        complComment["CONDSAMP"] = "";;
        FULLSAMP = '';
        complComment["FULLSAMP"] = "";

        DUALDUAL = 'O\\left(\\frac{1}{\\varepsilon^2}\\right)';
        complComment['DUALDUAL'] = "Follows from [" + canonne2014testing + "]";
        PAIRDUAL = 'O\\left(\\frac{\\log{N}}{\\varepsilon^2} + \\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)';
        complComment["PAIRDUAL"] = "Follows from [" + potescalable + "]";
        SUBDUAL = 'O\\left(\\frac{d^{2}N}{\\varepsilon^{4}}\\right)';
        complComment["SUBDUAL"] = "Follows from [" + bhattacharyya2024testing + "]";
        CONDDUAL = 'O\\left(\\frac{\\log{N}}{\\varepsilon^2} + \\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)';
        complComment["CONDDUAL"] = "Follows from PAIRCOND vs DUAL";
        FULLDUAL = 'O\\left(\\frac{1}{\\varepsilon^2}\\right)';
        complComment["FULLDUAL"] = "Follows from DUAL vs DUAL";

        PAIRPAIR = '';
        complComment["PAIRPAIR"] = "";
        SUBPAIR = '';
        complComment["SUBPAIR"] = " ";
        CONDPAIR = '';
        complComment["CONDPAIR"] = "";
        FULLPAIR = 'O\\left(\\frac{\\log{N}}{\\varepsilon^2} + \\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)';
        complComment["FULLPAIR"] = "Follows from DUAL vs PAIRCOND";

        SUBSUB = 'O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)';
        complComment["SUBSUB"] = "Follows from [" + kumar2023tolerant + "]";
        CONDSUB = 'O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)';
        complComment["CONDSUB"] = "Follows from up"
        FULLSUB = 'O\\left(\\frac{d^{2}N}{\\varepsilon^{4}}\\right)';
        complComment["FULLSUB"] = "Follows from [" + bhattacharyya2024testing + "]";

        CONDCOND = '';
        complComment["CONDCOND"] = "";
        FULLCOND = 'O\\left(\\frac{1}{\\varepsilon^4}\\right)';
        complComment["FULLCOND"] = "Follows from [" + nar2020cond + "]";
        return;
    }
}

else if (TBox_3IsLB)
{
    if (TBox_1IsZero && TBox_2IsTv)
    {
        // Non-Tolerant vs Total Variation Distance
        SAMPSAMP = '\\Omega\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)';
        complComment["SAMPSAMP"] = "Follows from Theorem 1 of [" + batu2013testing + "].";
        DUALSAMP = '\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)';
        complComment["DUALSAMP"] = "Follows from below";
        PAIRSAMP = '\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)';
        complComment["PAIRSAMP"] = "Follows from below";;
        SUBSAMP = '\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)';
        complComment["SUBSAMP"] = "Follows from below";;
        CONDSAMP = '\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)';
        complComment["CONDSAMP"] = "Follows from below";;
        FULLSAMP = '\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)';
        complComment["FULLSAMP"] = "Follows from [" + valiant2017automatic + "]";

        DUALDUAL = '\\Omega\\left(\\frac{1}{\\varepsilon}\\right)';
        complComment['DUALDUAL'] = "Follows from Below";
        PAIRDUAL = '\\Omega\\left(\\frac{1}{\\varepsilon}\\right)';
        complComment["PAIRDUAL"] = "Follows from Below ";
        SUBDUAL = '\\Omega\\left(\\frac{1}{\\varepsilon}\\right)';
        complComment["SUBDUAL"] = "Follows from Below";
        CONDDUAL = '\\Omega\\left(\\frac{1}{\\varepsilon}\\right)';
        complComment["CONDDUAL"] = "Follows from Below";
        FULLDUAL = '\\Omega\\left(\\frac{1}{\\varepsilon}\\right)';
        complComment["FULLDUAL"] = "Follows from [" + canonne2014testing + "]"

        PAIRPAIR = '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)';
        complComment["PAIRPAIR"] = "Follows from Below";
        SUBPAIR = '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)';
        complComment["SUBPAIR"] = "Follows from Below";
        CONDPAIR = '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)';
        complComment["CONDPAIR"] = "Follows from Below";
        FULLPAIR = '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)';
        complComment["FULLPAIR"] = "Follows from [" + canonne2015testing + "]";

        SUBSUB = '\\Omega\\left(\\frac{\\sqrt{d}}{\\varepsilon^2}, \\frac{n^{3/4}}{\\varepsilon}\\right)';
        complComment["SUBSUB"] = "Follows from Theorem 10 of [" + canonne2017testing + "]";
        CONDSUB = '\\Omega\\left(\\frac{\\sqrt{d}}{\\varepsilon^2}\\right)';
        complComment["CONDSUB"] = "Follows from Below"
        FULLSUB = '\\Omega\\left(\\frac{\\sqrt{d}}{\\varepsilon^2}\\right)';
        complComment["FULLSUB"] = "Follows from Theorem 7 of [" + canonne2017testing + "]" ;

        CONDCOND = '\\Omega\\left(\\log{\\log{N}}\\right)';
        complComment["CONDCOND"] = "Follows from [" + chakraborty2024tight +"]";
        FULLCOND = '';
        complComment["FULLCOND"] = "";
        return;
     
    }
    
    if (TBox_1IsInfty && TBox_2IsTv)
    {
        //TODO: Add the correct complexity
        return;
    
    }
    
    if (TBox_1IsTv && TBox_2IsTv)
    {
        // Tolerant Total Variation Distance vs Total Variation Distance
        SAMPSAMP = '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)';
        complComment["SAMPSAMP"] = 'Follows from below';
        DUALSAMP = '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)';
        complComment["DUALSAMP"] = "Follows from below";
        PAIRSAMP = '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)';
        complComment["PAIRSAMP"] = "Follows from below";
        SUBSAMP = '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)';
        complComment["SUBSAMP"] = "Follows from below";
        CONDSAMP = '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)';
        complComment["CONDSAMP"] = "Follows from below";
        FULLSAMP = '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)';
        complComment["FULLSAMP"] = "Follows from [" + jiao2018minimax + "].";

        DUALDUAL = '\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)';
        complComment['DUALDUAL'] = "Follows from Below";
        PAIRDUAL = '\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)';
        complComment["PAIRDUAL"] = "Follows from Below ";
        SUBDUAL = '\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)';
        complComment["SUBDUAL"] = "Follows from Below";
        CONDDUAL = '\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)';
        complComment["CONDDUAL"] = "Follows from Below";
        FULLDUAL = '\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)';
        complComment["FULLDUAL"] = "Follows from [" + canonne2014testing + "]"

        PAIRPAIR = '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)';
        complComment["PAIRPAIR"] = "Follows from Below";
        SUBPAIR = '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)';
        complComment["SUBPAIR"] = "Follows from Below";
        CONDPAIR = '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)';
        complComment["CONDPAIR"] = "Follows from Below";
        FULLPAIR = '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)';
        complComment["FULLPAIR"] = "Follows from [" + canonne2015testing + "]";

        SUBSUB = '\\Omega\\left(\\frac{\\sqrt{n}}{\\log{n}}\\right)';
        complComment["SUBSUB"] = "Follows from Theorem 11 of [" + canonne2017testing + "]";
        CONDSUB = '\\Omega\\left(\\frac{\\sqrt{n}}{\\varepsilon^2}\\right)';
        complComment["CONDSUB"] = "Follows from Below"
        FULLSUB = '\\Omega\\left(\\frac{\\sqrt{n}}{\\varepsilon^2}\\right)';
        complComment["FULLSUB"] = "Follows from Theorem 10 of [" + canonne2017testing + "]";

        CONDCOND = '\\Omega\\left(\\log{\\log{N}}\\right)';
        complComment["CONDCOND"] = "Follows from [" + chakraborty2024tight +"]";
        FULLCOND = '';
        complComment["FULLCOND"] = "";
        return;
    
    }
}


}
