import { useState } from 'react';
import { CardItem } from '../ui/CardItem';
import { THEMES_OPTIONS } from '../../constants/themesData'; 
import styles from './Tabs.module.css';

export function Tabs({ activeTab, setActiveTab }) {

  return (
    <div className={styles.container}>
      {THEMES_OPTIONS.map((theme) => (
       <CardItem 
          key={theme.id}
          text={theme.name}
          miniBg={theme.bg}
          primaryColor={theme.primary}
          secondaryColor={theme.secondary}
          isActive={activeTab === theme.id} 
          onClick={() => setActiveTab(theme.id)} 
      />
      ))}
    </div>
  );
}