import { Fragment, memo, type FC } from 'react';
import { View } from 'react-native';

import type { TIcon } from '@/components';
import type { SongActionKey } from '../../types';
import { styles } from './ActionGroup.styles';
import { ActionRow } from '../ActionRow';

type ActionGroupProps = {
  actions: readonly { key: SongActionKey; label: string; icon: TIcon }[];
  onAction: (key: SongActionKey) => void;
};

export const ActionGroup: FC<ActionGroupProps> = memo(({ actions, onAction }: ActionGroupProps) => (
  <View style={styles.card}>
    {actions.map((action, index) => (
      <Fragment key={action.key}>
        {index > 0 && <View style={styles.divider} />}
        <ActionRow actionKey={action.key} label={action.label} icon={action.icon} onPress={onAction} />
      </Fragment>
    ))}
  </View>
));

ActionGroup.displayName = 'ActionGroup';
