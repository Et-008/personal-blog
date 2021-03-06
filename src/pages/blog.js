import * as React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Home`;
  const posts = data.allMarkdownRemark.nodes;
  const categories = [];

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  posts.map((poost) => {
    console.log(poost)
    !categories.includes(poost.frontmatter.category) &&
      categories.push(poost.frontmatter.category);
  });

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <ol style={{ listStyle: `none` }}>
        {categories.map((category) => {
          return (
            <>
              <h4># {category.toUpperCase()}</h4>
              {posts
                .filter((post) => post.frontmatter.category === category)
                .map((post) => {
                  const title = post.frontmatter.title || post.fields.slug;

                  return (
                    <li key={post.fields.slug}>
                      <article
                        className="post-list-item"
                        itemScope
                        itemType="http://schema.org/Article"
                      >
                        <header>
                          <h2>
                            <Link
                              to={"/blog" + post.fields.slug}
                              itemProp="url"
                            >
                              <span itemProp="headline">{title}</span>
                            </Link>
                          </h2>
                          <small>{post.frontmatter.date}</small>
                        </header>
                        <section>
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                post.frontmatter.description || post.excerpt,
                            }}
                            itemProp="description"
                          />
                        </section>
                      </article>
                    </li>
                  );
                })}
            </>
          );
        })}
      </ol>
      <Bio />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
        }
      }
    }
  }
`;
