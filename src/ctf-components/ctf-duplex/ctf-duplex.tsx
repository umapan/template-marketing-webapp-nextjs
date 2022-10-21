import { Container, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { DuplexFieldsFragment } from '@ctf-components/ctf-duplex/__generated/ctf-duplex.generated';
import { CtfImage } from '@ctf-components/ctf-image/ctf-image';
import { CtfRichtext } from '@ctf-components/ctf-richtext/ctf-richtext';
import PageLink from '@src/components/link/page-link';
import LayoutContext, { defaultLayout } from '@src/layout-context';
import { getColorConfigFromPalette } from '@src/theme';
import optimizeLineBreak from '@src/typography/optimize-line-break';

const useStyles = makeStyles((theme: Theme) => ({
  innerContainer: {
    display: 'grid',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '126rem',
    padding: theme.spacing(8, 0, 8),
    gap: theme.spacing(7),

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: theme.spacing(14),
      padding: theme.spacing(19, 0, 19),
    },
  },
  contentContainer: {
    margin: 'auto 0',
    order: 1,
    [theme.breakpoints.up('md')]: {
      order: 'initial',
    },
  },
  headline: {
    fontSize: '3.4rem',
    maxWidth: '60.4rem',
    [theme.breakpoints.up('xl')]: {
      fontSize: '3.8rem',
    },
  },
  richText: {
    fontWeight: 400,
    lineHeight: 1.52,
    marginTop: theme.spacing(7),
    '& .MuiTypography-body1': {
      fontSize: '2rem',
      [theme.breakpoints.up('xl')]: {
        fontSize: '2.5rem',
      },
    },
  },
  ctaContainer: {
    marginTop: theme.spacing(8),
    '& svg.MuiSvgIcon-root': {
      fontSize: 'inherit',
    },
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    order: 0,
    [theme.breakpoints.up('md')]: {
      order: 'initial',
    },
  },
  image: {
    display: 'block',
    margin: 'auto 0',
    maxWidth: '100%',
  },
  imageFull: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
  },
  nextImageContainer: {
    width: '100%',
    height: 'auto',
  },
}));

const DuplexContent = (props: DuplexFieldsFragment) => {
  const { headline, bodyText, targetPage, ctaText, colorPalette } = props;

  const colorConfig = getColorConfigFromPalette(colorPalette || '');
  const classes = useStyles();

  return (
    <div className={classes.contentContainer}>
      {headline && (
        <Typography
          variant="h1"
          component="h2"
          className={classes.headline}
          style={{ color: colorConfig.headlineColor }}
        >
          {optimizeLineBreak(headline)}
        </Typography>
      )}
      {bodyText && (
        <LayoutContext.Provider value={{ ...defaultLayout, parent: 'duplex' }}>
          <div style={{ color: colorConfig.textColor }}>
            <CtfRichtext {...bodyText} className={classes.richText} />
          </div>
        </LayoutContext.Provider>
      )}
      {targetPage && targetPage.slug && (
        <div className={classes.ctaContainer}>
          <PageLink
            page={targetPage}
            variant="contained"
            color={colorConfig.buttonColor}
            isButton
          >
            {ctaText}
          </PageLink>
        </div>
      )}
    </div>
  );
};

const DuplexImage = (props: DuplexFieldsFragment) => {
  const { image, imageStyle: imageStyleBoolean } = props;
  const imageStyle = imageStyleBoolean ? 'fixed' : 'full';

  const classes = useStyles();

  return (
    <div className={classes.imageContainer}>
      {image ? (
        <div className={classes.nextImageContainer}>
          <CtfImage
            className={clsx([classes.image, imageStyle === 'fixed' && classes.imageFull])}
            url={`${image.url}?w=600`}
            title={image.description || undefined}
            layout="responsive"
            width={image.width!}
            height={image.height!}
          />
        </div>
      ) : null}
    </div>
  );
};

export const CtfDuplex = (props: DuplexFieldsFragment) => {
  const { colorPalette, containerLayout: containerLayoutBoolean } = props;

  const colorConfig = getColorConfigFromPalette(colorPalette || '');
  const classes = useStyles();

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: colorConfig.backgroundColor,
      }}
    >
      <div className={classes.innerContainer}>
        {containerLayoutBoolean ? (
          <>
            <DuplexImage {...props} />
            <DuplexContent {...props} />
          </>
        ) : (
          <>
            <DuplexContent {...props} />
            <DuplexImage {...props} />
          </>
        )}
      </div>
    </Container>
  );
};
