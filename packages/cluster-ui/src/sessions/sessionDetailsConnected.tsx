// Copyright 2020 The Cockroach Authors.
//
// Use of this software is governed by the Business Source License
// included in the file licenses/BSL.txt.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0, included in the file
// licenses/APL.txt.

import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppState } from "src/store";
import { SessionDetails } from ".";
import { actions as sessionsActions, selectSession } from "src/store/sessions";
import { actions as terminateQueryActions } from "src/store/terminateQuery";
import { actions as nodesActions } from "src/store/nodes";
import { actions as nodesLivenessActions } from "src/store/liveness";

import { nodeDisplayNameByIDSelector } from "src/store/nodes";

export const SessionDetailsPageConnected = withRouter(
  connect(
    (state: AppState, props: RouteComponentProps) => ({
      nodeNames: nodeDisplayNameByIDSelector(state),
      session: selectSession(state, props),
      sessionError: state.adminUI.sessions.lastError,
    }),
    {
      refreshSessions: sessionsActions.refresh,
      cancelSession: terminateQueryActions.terminateSession,
      cancelQuery: terminateQueryActions.terminateQuery,
      refreshNodes: nodesActions.refresh,
      refreshNodesLiveness: nodesLivenessActions.refresh,
    },
  )(SessionDetails),
);
