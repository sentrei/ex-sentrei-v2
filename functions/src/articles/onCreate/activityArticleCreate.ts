/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import Activity from "@/types/Activity";
import Article from "@/types/Article";

const db = admin.firestore();

/**
 * Create article activity on create
 */
const activityArticleCreate = functions.firestore
  .document("articles/{articleId}")
  .onCreate(async (snap, context) => {
    const {articleId} = context.params;

    const data = snap.data() as Article.Response;

    const activity: Activity.CreateArticle = {
      action: "created",
      after: data,
      before: null,
      category: "articles",
      categoryId: articleId,
      createdById: data.updatedById,
      fullItemPath: `articles/${articleId as string}`,
      itemPath: `articles/${articleId as string}`,
      spaceId: data.spaceId,
      updatedAt: data.updatedAt,
      user: data.updatedBy,
      userId: data.updatedById,
      userNotification: [],
    };

    return db.collection("activity").add(activity);
  });

export default activityArticleCreate;
