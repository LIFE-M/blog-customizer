import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
  onApply: (values: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: Props): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultArticleState);
  const formRef = useRef<HTMLDivElement>(null);
  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formValues);
  };
  const handleReset = (): void => {
    setFormValues(defaultArticleState);
    onApply(defaultArticleState);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent): void => {
      if (!formRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div ref={formRef}>
      <ArrowButton isOpen={isOpen} onClick={handleClick} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formValues.fontFamilyOption}
            onChange={(option) =>
              setFormValues({ ...formValues, fontFamilyOption: option })
            }
          />
          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={formValues.fontSizeOption}
            onChange={(option) =>
              setFormValues({ ...formValues, fontSizeOption: option })
            }
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formValues.fontColor}
            onChange={(option) => setFormValues({ ...formValues, fontColor: option })}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formValues.backgroundColor}
            onChange={(option) =>
              setFormValues({ ...formValues, backgroundColor: option })
            }
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formValues.contentWidth}
            onChange={(option) => setFormValues({ ...formValues, contentWidth: option })}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
