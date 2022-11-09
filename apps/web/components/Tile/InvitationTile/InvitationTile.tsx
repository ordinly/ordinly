import { Tile } from "@components/Tile";
import { Button } from "@components/Button";
import { Icon } from "@components/Icon";

import styles from "./InvitationTile.module.css";

import type { InvitationTileProps } from "./types";

const InvitationTile = ({
  id,
  companyName,
  userName,
  image,
  onAcceptInvitation,
  onDeclineInvitation,
}: InvitationTileProps) => {
  const onClickAccept = () => {
    onAcceptInvitation({ invitationId: id });
  };

  const onClickDecline = () => {
    onDeclineInvitation({ invitationId: id });
  };

  return (
    <Tile id={id}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.image}>
            {image ? <img src={image}></img> : <Icon icon="no-image" />}
          </div>

          <div>
            <h4 className={styles.title}>{companyName}</h4>

            <p>From: {userName}</p>
          </div>
        </div>

        <div
          id={`${id}-invitation-response-buttons`}
          className={styles.actions}
        >
          <Button text="Decline" variant="secondary" onClick={onClickDecline} />

          <Button text="Accept" onClick={onClickAccept} />
        </div>
      </div>
    </Tile>
  );
};

export default InvitationTile;
