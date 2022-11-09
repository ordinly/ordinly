import { useEffect, useState, useContext, useMemo } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import { useSpring, animated } from "@react-spring/web";

import {
  getCompanyProfile,
  updateCompanyProfile,
} from "@ordinly/api-abstraction/companies";

import { Button } from "@components/Button";
import { RatingStars } from "@components/RatingStars";
import { TagInput } from "@components/TagInput";
import { Form } from "@components/Form";
import { Field, FieldArray } from "@components/Field";
import { ProfilePicture } from "@components/ProfilePicture";
import { RichTextEditor } from "@components/RichTextEditor";
import { Input } from "@components/Input";
import { Tabs } from "@components/Tabs";

import UserContext from "@contexts/UserContext";

import AddReviewModal from "@modules/marketplace/[companyId]/profile/AddReviewModal";
import UpdateReviewModal from "@modules/marketplace/[companyId]/profile/UpdateReviewModal";

import styles from "./OverviewSection.module.css";

const Overview = ({ onOpenMustBeLoggedInModal }) => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const transitionTop = useSpring({
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0 },
  });

  const initialTags = useMemo(() => {
    return profile?.tags?.map((tag) => ({
      value: tag,
      key: Math.random(),
    }));
  }, [profile?.tags]);

  const onOpenAddReviewSlideout = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "add-new-review": true },
    });
  };

  const onOpenUpdateReviewSlideout = () => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        "update-review": true,
        "review-id": profile.userReview,
      },
    });
  };

  const updateProfile = async () => {
    if (router?.query?.companyId) {
      const { profile } = await getCompanyProfile({
        companyId: router?.query?.companyId,
      });

      setProfile(profile);
    }
  };

  const onUpdateCompanyProfile = async ({ tags, ...values }) => {
    await updateCompanyProfile({
      companyId: router.query["companyId"] as string,
      tags: tags.map(({ value }) => value),
      ...values,
    });

    await updateProfile();

    setEditMode(false);
  };

  const onTabChange = (newTab) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, tab: newTab },
    });
  };

  useEffect(() => {
    (async () => {
      await updateProfile();
    })();
  }, [router?.query?.companyId]);

  return (
    <>
      <Head>
        <title>{profile?.name} - Profile</title>
      </Head>

      <animated.div className={styles.contentContainer} style={transitionTop}>
        <Form
          onSubmit={onUpdateCompanyProfile}
          mutators={{ ...arrayMutators }}
          render={({
            form,
            form: {
              restart,
              mutators: { push, remove },
            },
            handleSubmit,
          }) => {
            const onEditClick = () => {
              if (!editMode) {
                setEditMode(true);
              } else {
                handleSubmit();
              }
            };

            const onCancel = () => {
              restart();
              setEditMode(false);
            };

            return (
              <div className={styles.infoSection}>
                <div className={styles.cover}></div>

                <div className={styles.main}>
                  <div className={styles.profileSection}>
                    <div className={styles.profilePicture}>
                      <ProfilePicture
                        _id={router.query["companyId"] as string}
                        readOnly
                        variant="company"
                        size="large"
                      />
                    </div>

                    <div className={styles.profileActions}>
                      <div className={styles.action}>
                        <Button
                          variant="outline"
                          text="Invite to project"
                          disabled={editMode}
                          onClick={user ? undefined : onOpenMustBeLoggedInModal}
                        />
                      </div>

                      <div className={styles.action}>
                        <Button
                          variant="outline"
                          text="Request a quote"
                          disabled={editMode}
                          onClick={user ? undefined : onOpenMustBeLoggedInModal}
                        />
                      </div>

                      <div className={styles.action}>
                        <Button
                          variant="outline"
                          text={`${
                            profile?.userReview ? "Edit your" : "Leave a"
                          } review`}
                          disabled={editMode}
                          onClick={
                            user
                              ? profile?.userReview
                                ? onOpenUpdateReviewSlideout
                                : onOpenAddReviewSlideout
                              : onOpenMustBeLoggedInModal
                          }
                        />
                      </div>

                      {profile?.canEdit ? (
                        <div className={styles.action}>
                          <Button
                            variant="primary"
                            text={`${editMode ? "Save" : "Edit"} profile`}
                            onClick={onEditClick}
                          />
                        </div>
                      ) : null}

                      {editMode ? (
                        <div className={styles.action}>
                          <Button
                            variant="secondary"
                            text="Cancel"
                            onClick={onCancel}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className={styles.info}>
                    <div className={styles.title}>{profile?.name}</div>

                    {profile?.tagline || editMode ? (
                      <div className={styles.tagline}>
                        <Field
                          name="tagline"
                          component={Input}
                          readOnly={!editMode}
                          placeholder="Add a tagline..."
                          inline
                          initialValue={profile?.tagline}
                        />
                      </div>
                    ) : null}

                    <div className={styles.rating}>
                      <RatingStars
                        numberOfReviews={profile?.reviews?.numberOfReviews}
                        value={profile?.reviews?.average}
                        disabled
                      />
                    </div>

                    {profile?.description || editMode ? (
                      <Field
                        name="description"
                        component={RichTextEditor}
                        readOnly={!editMode}
                        placeholder="Add a description..."
                        initialValue={profile?.description}
                      />
                    ) : null}

                    <FieldArray name="tags" initialValue={initialTags}>
                      {({ fields }) => {
                        return (
                          <div className={styles.tagsContainer}>
                            {fields.map((name, index) => {
                              return (
                                <>
                                  <Field
                                    key={`${
                                      form.getFieldState(name)?.value?.key
                                    }`}
                                    hideErrorMessage
                                    validate={(value) =>
                                      !value?.value ? "Required" : undefined
                                    }
                                    name={name}
                                    component={TagInput}
                                    autocomplete="name"
                                    onRemove={() => {
                                      fields.remove(index);
                                    }}
                                    inline
                                    readOnly={!editMode}
                                  />
                                </>
                              );
                            })}

                            {editMode ? (
                              <div style={{ display: "inline-block" }}>
                                <Button
                                  text="Add a tag"
                                  icon="add"
                                  variant="ghost"
                                  onClick={() =>
                                    push("tags", {
                                      value: "",
                                      key: Math.random(),
                                    })
                                  }
                                />
                              </div>
                            ) : null}
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                </div>
              </div>
            );
          }}
        />

        <Tabs
          id="profile-tabs"
          tabs={[
            { id: "posts", text: "Posts" },
            { id: "reviews", text: "Reviews" },
            { id: "price-book", text: "Price book" },
            { id: "team", text: "Team" },
            { id: "job-postings", text: "Job postings" },
          ]}
          value={router.query.tab as string}
          onChange={onTabChange}
        />
      </animated.div>

      <AddReviewModal onClose={updateProfile} />

      <UpdateReviewModal onClose={updateProfile} />
    </>
  );
};

export default Overview;
