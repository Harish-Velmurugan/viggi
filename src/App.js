import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UpdateProfile from "./Components/Updateprofile/updateprofile";
import CompanyUpdate from "./Components/Updateprofile/CompanyUpdate";
import Extenddays from "./Components/Extenddays/extenddays";
import Navbar from "./Components/Navbar/nav";
import Homepage from "./Components/HomePage/Homepage";
import Home from "./Components/HomePage/home";
import SSobj from "./Components/Selected Soln/SSobj";
import SSSobj from "./Components/View Soln/viewsolution";
import Dashboard from "./Components/Dashboard/dashboard";
import ProblemInvolved from "./Components/ProblemInvolved/probleminvolved";
import Feed from "./Components/Feed/Feed";
// import SignIn from "./Components/SignIn/SignIn";
// import SignUp from "./Components/SignUp/SignUp";
import MyProfile from "./Components/Profile/profile1";
import AbstractLay from "./Components/Abstract/AbstractLay";
import CollaborateLay from "./Components/Collaborate/CollaborateLay";
import Confirm from "./Components/Confirm/Confirm";
import SubmitSolution from "./Components/Dashboard/submitsolution/submitsolution";
import Search from "./Components/search/search";
import Test from "./Components/Profile/test";
import Table from "./Components/Table/Table";
import ProbDesc from "./Components/ProbDesc/ProbDesc";
import TopCard from "./Components/TopSolvers/TopCard";
import SolversNav from "./Components/TopSolvers/SolversNav";
import SolversNav1 from "./Components/TopSolvers/SolversNav1";
import Wallet from "./Components/Wallet/wallet";
import ProblemDescription from "./Components/problemdetails/problemdetails";
import Logout from "./Components/Logout/logout";
import ForgetPassword from "./Components/ForgotPassword/ForgotPassword";
import Store from "./Components/Rss Feed/store";
import SContractLay from "./Components/CollaborateContract/SContractLay";
import { Provider } from "react-redux";
import Contract from "./Components/Contract/Contract";
import SolContract from "./Components/Contract/SolContract";
import TC from "./Components/T&C/TC";
import SeekerCondition from "./Components/CollaborateContract/Seekerconditions";
import WalletDashboard from "./Components/Wallet/walletdashboard";
import Pay from "./Components/Wallet/pay";

import bid from "./Components/Wallet/bid";
import pointsbid from "./Components/Wallet/pointsbid";
import Addfunds from "./Components/Wallet/addfunds";
import ForgotPassword from "./Components/Wallet/forgotPassword";
import Try from "./Components/Try/try";
import Withdraw from "./Components/Wallet/withdraw";
import Notification from "./Components/Notification/Notification";
import PayWithWallet from "./Components/Wallet/paywithwallet";
import PostProblem from "./Components/Dashboard/PostProblem/postproblem";

import ProblemPosted from "./Components/ProblemsPosted/problemsposted";
import Trending from "./Components/Trending/trending";
import InitialComp from "./Components/Chat/InitialComp";

import SolutionEdit from "./Components/SolutionEdit/solutionedit";
import ExtendDaysRequest from "./Components/SolutionEdit/Extenddays";

import Profile from "./Components/Profile/profile2";

import ProblemRefining from "./Components/ProblemRefining/problemRefining";
import ProblemRefiningPost from "./Components/ProblemRefining/problemRefiningPost";
import Forum from "./Components/Forum/forum";

import PostDetail from "./Components/Forum/postdetail";
import Wiki from "./Components/Wiki/Wiki";

import createWiki from "./Components/Wiki/createWiki";
import editWiki from "./Components/Wiki/editWiki";
import viewWiki from "./Components/Wiki/viewWiki";

import reEditWiki from "./Components/Wiki/reEditWiki";

import prototypeTestDb from "./Components/Prototype&Test/prototypeTestDb";
import prototypeTestRskBgt from "./Components/Prototype&Test/prototypeTestRskBgt";
import prototypeTestImplementor from "./Components/Prototype&Test/prototypeTestImplementor";
import testing1 from "./Components/Prototype&Test/testing";

import RevenueSplit from "./Components/SolverCollaboration/RevenueSplit";
import SContract from "./Components/SolverCollaboration/SContract";
import { DetailsProvider } from "./context/DetailsContext";
import Result from "./Components/Survey/Result";
// import DashboardTest from "./Components/Dashboard/dashboardTest";
import Lor from "./Components/LOR/Lor";
import Viewlor from "./Components/LOR/Viewlor";
import ExpertPanel from "./Components/expert/expertpanel";
import ExpertRequest from "./Components/expert/expertRequest";
import ExpertList from "./Components/expert/expertsList";
import ExpertPost from "./Components/expert/expertPost";
import TemplateView from "./Components/expert/viewTemplate";
import ExpertDashboard from "./Components/expert/expertDashboard";
import Tree from "./Components/Tree/Tree";

// import Comments from "./Components/comments/comments";
import Quote from "./Components/DataProvider/Quote";
import Helper from "./Components/DataProvider/helper";
import DPView from "./Components/DataProvider/DPView";
import DPinvolved from "./Components/DataProvider/DPinvolved";
// import DataProviderReq from "./Components/DataProvider/DataRequest";
import CommunityList from "./Components/community/CommunityList";
import Community from "./Components/community/Community";

import AdminPage from "./Components/CompanyAuth/AdminPage";

class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <DetailsProvider>
          <div className="app">
            <BrowserRouter>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/dashboard/postproblem" component={PostProblem} />
              <Route path="/dashboard/expertpanel" component={ExpertPanel} />
              <Route
                path="/dashboard/ProblemInvolved"
                component={ProblemInvolved}
              />
              <Route
                path="/dashboard/ProblemPosted"
                component={ProblemPosted}
              />
              <Route path="/dashboard/ExpiredProblem" component={Table} />
              <Route path="/dashboard/Trending" component={Trending} />
              <Route exact path="/Nav" component={Navbar} />
              <Route exact path="/" component={Homepage} />
              <Route exact path="/home" component={Home} />
              {/* <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} /> */}
              <Route path="/update" component={UpdateProfile} />
              <Route path="/myprofile" component={MyProfile} />
              <Route path="/abstract" component={AbstractLay} />
              <Route path="/feed" component={Feed} />
              <Route path="/viewsolution" component={SSSobj} />
              <Route path="/extenddays" component={Extenddays} />
              <Route exact path="/selectedsolution" component={SSobj} />
              <Route path="/collaborate" component={CollaborateLay} />
              <Route path="/solverContract" component={SContractLay} />
              <Route path="/seekerContract" component={SeekerCondition} />
              <Route path="/seekerRevenueSplit" component={Confirm} />
              <Route path="/submitsolution" component={SubmitSolution} />
              <Route path="/search" component={Search} />
              <Route path="/test" component={Test} />
              <Route path="/table" component={Table} />
              <Route path="/prblmdesc" component={ProbDesc} />
              <Route path="/topsolver" component={TopCard} />
              <Route path="/solver" component={SolversNav} />
              <Route path="/solver1" component={SolversNav1} />
              <Route path="/wallet" component={Wallet} />
              <Route path="/problemdetails" component={ProblemDescription} />
              <Route path="/logout" component={Logout} />
              <Route path="/forgotpassword" component={ForgetPassword} />
              <Route path="/contract" component={Contract} />
              <Route path="/solcontract" component={SolContract} />
              <Route path="/tc" component={TC} />
              <Route path="/walletdashboard" component={WalletDashboard} />
              <Route path="/pay" component={Pay} />
              <Route path="/bid" component={bid} />
              <Route path="/reputation-points" component={pointsbid} />
              <Route path="/addfunds" component={Addfunds} />
              <Route path="/walletforgotPassword" component={ForgotPassword} />
              <Route path="/try" component={Try} />
              <Route path="/withdrawfunds" component={Withdraw} />
              <Route path="/walletpay" component={PayWithWallet} />
              <Route path="/notify" component={Notification} />
              <Route path="/chat" component={InitialComp} />
              <Route path="/dashboard/solutionedit" component={SolutionEdit} />
              <Route path="/extenddays" component={ExtendDaysRequest} />
              <Route path="/profile" component={Profile} />
              <Route path="/lor" component={Lor} />
              <Route path="/viewlor" component={Viewlor} />
              <Route path="/wiki" component={Wiki} />
              <Route path="/createWiki" component={createWiki} />
              <Route path="/editWiki" component={editWiki} />
              <Route path="/viewWiki" component={viewWiki} />
              <Route path="/reEditWiki" component={reEditWiki} />
              <Route
                path="/dashboard/solPrototypeDb"
                component={prototypeTestDb}
              />
              <Route
                path="/dashboard/solPrototypeInitial"
                component={prototypeTestRskBgt}
              />
              <Route
                path="/dashboard/solPrototypeImplementor"
                component={prototypeTestImplementor}
              />

              <Route path="/testing1" component={testing1} />

              <Route path="/solverRevenueSplit" component={RevenueSplit} />
              <Route path="/tree" component={Tree} />
              <Route path="/Result" component={Result} />
              <Route
                path="/dashboard/problemRefining"
                component={ProblemRefining}
              />
              <Route
                path="/dashboard/problemRefiningpost"
                component={ProblemRefiningPost}
              />
              <Route path="/postdetail" component={PostDetail} />
              <Route path="/forum" component={Forum} />
              <Route
                path="/solverCollaborationContract"
                component={SContract}
              />
              <Route path="/dashboard/request" component={ExpertRequest} />
              <Route path="/list" component={ExpertList} />
              <Route path="/dashboard/expertpost" component={ExpertPost} />
              <Route
                path="/dashboard/expertDashboard"
                component={ExpertDashboard}
              ></Route>
              <Route path="/viewTemplate" component={TemplateView}></Route>
              <Route path="/tree" component={Tree}></Route>
              <Route path="/dashboard/helpers" component={Helper}></Route>
              <Route path="/dashboard/quotation" component={Quote}></Route>
              <Route path="/DataProviderFeed" component={DPView}></Route>
              <Route
                path="/dashboard/DataProviderProblemInvolved"
                component={DPinvolved}
              />
              <Route
                path="/DataProviderProblemInvolved"
                component={DPinvolved}
              />
              <Route path="/updateCompany" component={CompanyUpdate} />
              <Route component={CommunityList} path="/dashboard/community" />
              <Route component={Community} path="/dashboard/communityList" />
              <Route path="/companyAuth/:a/:code" component={AdminPage} />
            </BrowserRouter>
          </div>
        </DetailsProvider>
      </Provider>
    );
  }
}

export default App;
