import { useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { ContentSwitcher } from "@components/ContentSwitcher";

import AllTheData from "@assets/landing/manage-projects/all-the-data.svg";
import CheckingBoxes from "@assets/landing/manage-projects/checking-boxes.svg";
import MindMap from "@assets/landing/manage-projects/mind-map.svg";
import PredictiveAnalytics from "@assets/landing/manage-projects/predictive-analytics.svg";

import AcceptTasks from "@assets/landing/manage-company/accept-tasks.svg";
import Hiring from "@assets/landing/manage-company/hiring.svg";
import Security from "@assets/landing/manage-company/security.svg";
import OnlineConnection from "@assets/landing/manage-company/online-connection.svg";

import Agreement from "@assets/landing/manage-clients/agreement.svg";
import FileSearching from "@assets/landing/manage-clients/file-searching.svg";
import OnlinePayments from "@assets/landing/manage-clients/online-payments.svg";
import Statistics from "@assets/landing/manage-clients/statistics.svg";

import { Features } from "@modules/landing/Features";

export default function Usecases() {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.tab) {
      router.replace({
        pathname: router.pathname,
        query: { tab: "projects" },
      });
    }
  }, []);

  const onChangeTab = (newTab) => {
    router.replace({
      pathname: router.pathname,
      query: { tab: newTab },
    });
  };

  return (
    <div>
      <Head>
        <title>Ordinly</title>
      </Head>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "80%" }}>
          <h1 style={{ fontSize: "2.5em" }}>
            One platform to manage all your...
          </h1>

          <ContentSwitcher
            id="feature-tabs"
            value={router?.query?.["tab"] as string}
            onChange={onChangeTab}
            items={[
              { id: "projects", text: "Projects", value: "projects" },
              { id: "clients", text: "Clients", value: "clients" },
              { id: "teams", text: "Teams", value: "teams" },
            ]}
            size="large"
          />
        </div>
      </div>

      {router?.query?.["tab"] === "projects" ? (
        <Features
          sections={[
            {
              title: "Collaborate with other users and companies",
              text:
                "Ordinly lets you organize your projects in whatever way makes sense to you. Invite other users and companies to collaborate on projects quickly and easily.",
              icon: MindMap,
            },
            {
              title: "Dashboards",
              text:
                "Get context on your projects at a glance with intuitive dashboards.",
              icon: AllTheData,
            },
            {
              title: "Task Management",
              text:
                "Track the progress of tasks and projects on mobile, desktop, or any device that connects to the internet.",
              icon: CheckingBoxes,
            },
            {
              title: "Forcasting",
              text:
                "Get insights into how to streamline processes and better forcast timelines by tracking metrics from past projects.",
              icon: PredictiveAnalytics,
            },
          ]}
        />
      ) : null}

      {router?.query?.["tab"] === "clients" ? (
        <Features
          sections={[
            {
              title: "Marketplace",
              text:
                "Get better visibility on the marketplace to recieve offers from other users and companies. Also get access to bidding on jobs directly.",
              icon: FileSearching,
            },
            {
              title: "Invoicing",
              text: "Generate professional quotes and invoices for clients.",
              icon: Agreement,
            },
            {
              title: "Client Portal",
              text:
                "Allow clients to view progress and milestones of projects in a fully customizable client portal.",
              icon: Statistics,
            },
            {
              title: "Online Payments",
              text:
                "Accept credit card, debit card, bank transfer, and any other type of payment.",
              icon: OnlinePayments,
            },
          ]}
        />
      ) : null}

      {router?.query?.["tab"] === "teams" ? (
        <Features
          sections={[
            {
              title: "Real-time Updates",
              text:
                "Track changes to projects and tasks with live updating when anyone makes changes.",
              icon: OnlineConnection,
            },
            {
              title: "Worker Management",
              text: "Find quality candidates and onboard workers quickly.",
              icon: Hiring,
            },
            {
              title: "Task Management",
              text:
                "Assign workers to teams, projects, and tasks to keep them up to date on what they need to be working on at any given time.",
              icon: AcceptTasks,
            },
            {
              title: "Robust Permissions",
              text:
                "Control how your workers can interact with your company's projects on a very granular level.",
              icon: Security,
            },
          ]}
        />
      ) : null}
    </div>
  );
}
