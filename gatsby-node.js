const { resolve } = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);
const slugify = require('slug');

exports.onCreateNode = ({ actions, getNode, node }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const requestedSlug = node.frontmatter.slug
      ? node.frontmatter.slug
      : node.frontmatter.title;
    const generatedSlug = createFilePath({
      node,
      getNode,
      basePath: 'content',
    });

    const isLibrary = generatedSlug.startsWith('/library');
    const date = new Date(node.frontmatter[isLibrary ? 'added' : 'date']);
    const title = slugify(requestedSlug).toLowerCase();

    const slug = `/log/${date.getFullYear()}/${title}`;

    actions.createNodeField({ node, name: 'type', value: 'log' });
    actions.createNodeField({ node, name: 'date', value: date });
    actions.createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  actions.createRedirect({ fromPath: '/log', toPath: '/' });

  const template = resolve('src/views/post.js');
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMarkdownRemark.edges.forEach(edge => {
    const path = edge.node.fields.slug;
    actions.createPage({
      path,
      component: template,
      context: {
        slug: path,
      },
    });
  });

  return result;
};
